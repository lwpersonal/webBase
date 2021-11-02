/**
 * 定时任务
 */
import { EventEmitter } from 'events';
import * as Queue from 'bull';
import * as Redis from 'ioredis';
import * as nodeSchedule from 'node-schedule';
import type { Job as ScheduleJob } from 'node-schedule';
import * as moment from 'moment';
import { getTimestamp } from './utils';
import type {
  TQueueData,
  TScheduleOn,
  TScheduleJobRule,
  IScheduleOptions,
  TScheduleProcess,
  ProcessCallbackFunction,
  ProcessPromiseFunction,
  IDefaultScheduleOptions,
  IRedisFinishedData,
} from './interface';

const GET_JOB_MARK_DEFAULT_FN = {
  minute: () => `${getTimestamp('minute')}`,
  hour: () => `${getTimestamp('hour')}`,
  date: () => `${getTimestamp('date')}`,
  second: () => `${getTimestamp()}`,
};

const DEFAULT_OPTIONS = {
  cleanDelay: 30000,
  queueOpts: {},
  getJobMark: GET_JOB_MARK_DEFAULT_FN.second,
  jobs: [],
};

const INTERNAL_OPTIONS = {
  finishedStaKeyExistSeconds: 60 * 60, // finished 状态存活时间
};

export default class Schedule<T extends Record<string, any>> {
  private options: Required<IScheduleOptions<T>>;
  private scheduleJob: ScheduleJob | null;
  private queue: Queue.Queue<TQueueData<T>> | null;
  private redisClient: IScheduleOptions<T>['redis'];
  private jobs: Required<IDefaultScheduleOptions<T>['jobs']>;
  private rule: TScheduleJobRule;
  private getJobMark: () => string;
  private eventEmitter: EventEmitter;

  constructor(options: IScheduleOptions<T>) {
    const { redis, jobs, rule, getJobMark } = options;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.scheduleJob = null;
    this.redisClient = redis;
    this.rule = rule;
    this.queue = null;
    this.jobs = Array.isArray(jobs) ? jobs : [];
    this.queue = this.createQueueClient();

    if (typeof getJobMark === 'function') {
      this.getJobMark = () => {
        const jobMarkStr = getJobMark();
        if (typeof jobMarkStr !== 'string') {
          throw new Error('getJobMark 必须返回字符串');
        }
        return jobMarkStr;
      };
    } else if (
      typeof getJobMark === 'string' &&
      GET_JOB_MARK_DEFAULT_FN[getJobMark]
    ) {
      this.getJobMark = GET_JOB_MARK_DEFAULT_FN[getJobMark];
    } else {
      this.getJobMark = GET_JOB_MARK_DEFAULT_FN.second;
    }
    this.eventEmitter = new EventEmitter();
  }

  /**
   * 当 job 完成时，缓存当前 job 的完成状态
   * 并判断是否完成
   */
  private cacheAndCheckJobStatus = async (
    job: Queue.Job<TQueueData<T>>,
    data: { status: 'failed' | 'completed'; data: any },
  ) => {
    const { name, cleanDelay } = this.options;
    const { jobId, jobMark, ids } = job.data;
    const statusRedisKey = `schedule:${name}:jobStatus:${jobMark}`;
    const queueItemData = {
      id: jobId,
      jobMark,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      ...data,
    };

    const pipeline = this.redisClient.pipeline();
    pipeline.sadd(statusRedisKey, JSON.stringify(queueItemData));
    // 设置过期时间，s
    pipeline.expire(
      statusRedisKey,
      INTERNAL_OPTIONS.finishedStaKeyExistSeconds,
    );
    pipeline.smembers(statusRedisKey);

    const [, , [err, queueStatus]] = await pipeline.exec();
    const staArr: IRedisFinishedData[] = queueStatus.map((item: string) => {
      return typeof item === 'string' ? JSON.parse(item) : null;
    });

    // redis 状态读取失败
    if (err) {
      throw new Error(err.message);
    }
    const dataArr: (IRedisFinishedData | null)[] = [queueItemData];
    const finishedSta = ids.every(id => {
      if (id === jobId) {
        return true;
      }
      const item = staArr.find(staItem => staItem.id === id) || null;
      dataArr.push(item);
      return item && (item.status === 'failed' || item.status === 'completed');
    });

    if (finishedSta) {
      this.eventEmitter.emit('finished', dataArr);
      // 触发事件后清除状态，finished 只被消费一次
      this.redisClient.del(statusRedisKey);
      // 清除 cleanDelay s 前完成的任务
      if (this.queue) {
        this.queue.clean(cleanDelay, 'failed');
        this.queue.clean(cleanDelay);
      }
    }
    return finishedSta;
  };

  /**
   * 创建 queue client
   */
  private createQueueClient() {
    const { name, queueOpts, redisOpts } = this.options;
    const redisClient = this.redisClient;
    const queue = new Queue<TQueueData<T>>(name, {
      ...queueOpts,
      redis: redisOpts,
      prefix: `schedule`,
      createClient(type, opts) {
        switch (type) {
          case 'client':
            return redisClient;
          case 'subscriber':
            /** NOTE
             * subscriber 必须开启新的 redis 连接
             * https://www.npmjs.com/package/redis
             */
            return redisClient.duplicate();
          default:
            return new Redis(opts);
        }
      },
    });

    queue
      .on('failed', async job => {
        await this.cacheAndCheckJobStatus(job, {
          data: '',
          status: 'failed',
        });
      })
      .on('completed', async (job, result) => {
        await this.cacheAndCheckJobStatus(job, {
          data: result,
          status: 'completed',
        });
      });

    this.queue = queue;
    return queue;
  }

  /**
   * @description 清空队列。
   * 重启后如果不需要继续执行以前的定时任务，请手动调用此函数清理
   * @param {boolean} [force=true]
   * @memberof Schedule
   */
  async cleanQueue(force = true) {
    if (!this.queue) {
      throw new Error('请在 queue 初始化后调用');
    }
    // 清空 redis 中所有的队列
    try {
      await this.queue.obliterate({ force });
    } catch (_) {
      // 队列为空时调用会报错
      // console.log('err: ', _);
    }
  }

  /**
   * @description 取消定时任务
   */
  cancel() {
    let cancelSta = false;
    if (this.scheduleJob) {
      cancelSta = this.scheduleJob.cancel();
      cancelSta && (this.scheduleJob = null);
    }
    return cancelSta;
  }

  /**
   * 启动定时任务
   */
  start() {
    const { name } = this.options;
    this.scheduleJob = nodeSchedule.scheduleJob(
      name,
      this.rule,
      this.scheduleCallback,
    );
  }

  /**
   * @description 定时任务回调函数，向 queue 添加任务队列
   *
   * @private
   * @memberof Schedule
   */
  private scheduleCallback = () => {
    if (!this.queue) {
      throw new Error('请在 queue 初始化后调用');
    }
    const { name } = this.options;
    // 同一批次的定时任务用相同的 jobMark 标识
    const jobMark = this.getJobMark();
    const ids = this.jobs.map(item => `${jobMark}_${item.name}`);
    const bulkArr = this.jobs.map(item => {
      const processName = `${name}_${item.name}`;
      // 自动生成 jobId
      const jobId = `${jobMark}_${item.name}`;
      return {
        name: processName,
        data: {
          ...item.data,
          type: item.name,
          jobId,
          jobMark,
          ids,
        },
        opts: { ...item.opts, jobId },
      };
    });
    this.queue.addBulk(bulkArr);
  };

  /**
   * @description 更改定时作业的时间，取消所有挂起的调用
   *
   * @param {Exclude<TScheduleJobRule, number>} spec
   * @memberof Schedule
   */
  reschedule = (spec: Exclude<TScheduleJobRule, number>) => {
    if (this.scheduleJob) {
      // 有启动的定时任务
      this.rule = spec;
      const nowJob = nodeSchedule.rescheduleJob(this.scheduleJob, spec);
      this.scheduleJob = nowJob;
    } else {
      // 没有启动的定时任务，此时修改配置，当重新 start 时应用
      this.rule = spec;
    }
  };

  /**
   * @description 调整 job 列表。
   * 更新 job 列表后，会停止当前运行的 jobs。
   * 需手动调用 start() 启动
   *
   * @param {(IScheduleOptions<T>['jobs']
   *       | ((jobs: IScheduleOptions<T>['jobs']) => IScheduleOptions<T>['jobs']))} jobs
   * @return {*}
   * @memberof Schedule
   */
  setJobs = (
    jobs:
      | IScheduleOptions<T>['jobs']
      | ((jobs: IScheduleOptions<T>['jobs']) => IScheduleOptions<T>['jobs']),
  ) => {
    const newJobs: IScheduleOptions<T>['jobs'] =
      typeof jobs === 'function' ? jobs(this.jobs) : jobs;

    if (!Array.isArray(newJobs)) {
      return false;
    }
    this.jobs = newJobs;
    // 更新 job 列表后，停止当前运行的 jobs
    this.cancel();
    return true;
  };

  /**
   * 任务队列处理函数
   */
  process: TScheduleProcess<TQueueData<T>> = (
    name: string,
    concurrency:
      | number
      | ProcessCallbackFunction<TQueueData<T>>
      | ProcessPromiseFunction<TQueueData<T>>,
    callback?:
      | ProcessCallbackFunction<TQueueData<T>>
      | ProcessPromiseFunction<TQueueData<T>>,
  ) => {
    const { name: scheduleName } = this.options;
    if (!this.queue) {
      throw new Error('请在 queue 初始化后调用');
    }
    // 当传入 * 时，不修改 name
    // 否则加入类的前缀
    const processName = '*' === name ? name : `${scheduleName}_${name}`;
    if (typeof concurrency === 'function') {
      return this.queue.process(processName, concurrency);
    } else if (
      typeof concurrency === 'number' &&
      typeof callback === 'function'
    ) {
      return this.queue.process(processName, concurrency, callback);
    } else {
      throw new Error('请检查参数格式');
    }
  };

  /**
   * 事件处理函数
   */
  on: TScheduleOn<TQueueData<T>, this> = (name, callback) => {
    if (!this.queue) {
      throw new Error('请在 queue 初始化后调用');
    }
    const selfEventNames = ['finished']; // 自定义事件
    if (selfEventNames.includes(name)) {
      this.eventEmitter.on(name, callback);
    } else if (name.indexOf('queue-') !== -1) {
      const queueEventName = name.replace('queue-', '');
      this.queue.on(queueEventName, callback);
    } else {
      throw new Error('没有此事件');
    }
    return this;
  };
}
