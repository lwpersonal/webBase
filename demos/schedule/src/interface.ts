import type {
  RecurrenceRule,
  RecurrenceSpecDateRange,
  RecurrenceSpecObjLit,
} from 'node-schedule';
import type * as Redis from 'ioredis';
import type { Job, JobOptions, QueueOptions, DoneCallback } from 'bull';

export interface IQueueJob<T> {
  name: string;
  data?: T;
  opts?: Omit<Job<T>['opts'], 'jobId'>;
}

export type TScheduleJobRule =
  | RecurrenceRule
  | RecurrenceSpecDateRange
  | RecurrenceSpecObjLit
  | Date
  | string
  | number;

export type TQueueDataDefault = {
  type: string;
  jobId: string;
  jobMark: string;
  ids: string[];
};

export type TQueueData<T extends Record<string, any>> = Omit<
  T,
  keyof TQueueDataDefault
> &
  TQueueDataDefault;

export type TQueueJob<T> = {
  name: string;
  data: T;
  opts?: JobOptions | undefined;
};

// 可选的 options
export interface IDefaultScheduleOptions<T> {
  cleanDelay: number; // 定时清理完成的 job 的延时毫秒数，默认 30s
  getJobMark: TType | (() => string); // 获取 jobId 标识
  queueOpts: Omit<QueueOptions, 'createClient' | 'redis' | 'prefix'> | null; // 队列配置
  jobs: TQueueJob<T>[]; // 需要执行的任务
}

type TType = 'second' | 'minute' | 'hour' | 'date';
export interface IScheduleOptions<T>
  extends Partial<IDefaultScheduleOptions<T>> {
  redisOpts: Redis.RedisOptions;
  redis: Redis.Redis; // redis 实例
  name: string; // 定时任务标识
  rule: TScheduleJobRule; // 定时任务时间
}

export type ProcessPromiseFunction<T> = (job: Job<T>) => Promise<void>;
export type ProcessCallbackFunction<T> = (
  job: Job<T>,
  done: DoneCallback,
) => void;
/**
 * process
 */
export type TScheduleProcess<T> = {
  (name: string, callback: ProcessCallbackFunction<T>): void;
  (name: string, callback: ProcessPromiseFunction<T>): void;
  (
    name: string,
    concurrency: number,
    callback: ProcessCallbackFunction<T>,
  ): void;
  (
    name: string,
    concurrency: number,
    callback: ProcessPromiseFunction<T>,
  ): void;
};

type EventCallback = () => void;
type ErrorEventCallback = (error: Error) => void;
interface JobPromise {
  cancel(): void; // Abort this job
}
type ActiveEventCallback<T = any> = (
  job: Job<T>,
  jobPromise?: JobPromise,
) => void;
type StalledEventCallback<T = any> = (job: Job<T>) => void;
type ProgressEventCallback<T = any> = (job: Job<T>, progress: any) => void;
type CompletedEventCallback<T = any> = (job: Job<T>, result: any) => void;
type FailedEventCallback<T = any> = (job: Job<T>, error: Error) => void;
type JobStatusClean =
  | 'completed'
  | 'wait'
  | 'active'
  | 'delayed'
  | 'failed'
  | 'paused';
type CleanedEventCallback<T = any> = (
  jobs: Array<Job<T>>,
  status: JobStatusClean,
) => void;
type RemovedEventCallback<T = any> = (job: Job<T>) => void;
type WaitingEventCallback = (jobId: string) => void;
interface FinishedData {
  id: string;
  jobMark: string;
  status: 'failed' | 'completed';
}

export interface IRedisFinishedData<T = any> extends FinishedData {
  data: T;
  time: string;
}

/**
 * 定时任务监听函数
 */
export type TScheduleOn<T, R> = {
  /**
   * 监听队列事件
   */
  (event: string, callback: (...args: any[]) => void): R;

  /**
   * 没个轮次的定时任务完成
   */
  (event: 'finished', callback: (result: FinishedData[]) => void): R;

  /**
   * 发生错误
   */
  (event: 'queue-error', callback: ErrorEventCallback): R;

  /**
   * 当一个作业正在等待处理
   */
  (event: 'queue-waiting', callback: WaitingEventCallback): R;

  /**
   * 一个 job 已经开始。 可以使用 `jobPromise.cancel()` 来中止它
   */
  (event: 'queue-active', callback: ActiveEventCallback<T>): R;

  /**
   * 一个 job 标记为停止
   */
  (event: 'queue-stalled', callback: StalledEventCallback<T>): R;

  /**
   * 作业的进度已更新
   */
  (event: 'queue-progress', callback: ProgressEventCallback<T>): R;

  /**
   * 一个 job 成功完成并带有 result
   */
  (event: 'queue-completed', callback: CompletedEventCallback<T>): R;

  /**
   * 一个 job 失败，并带有 error
   */
  (event: 'queue-failed', callback: FailedEventCallback<T>): R;

  /**
   * The queue has been paused
   */
  (event: 'queue-paused', callback: EventCallback): R;

  /**
   * 队列已暂停
   */
  (event: 'queue-resumed', callback: EventCallback): R; // tslint:disable-line unified-signatures

  /**
   * 已成功删除作业
   */
  (event: 'queue-removed', callback: RemovedEventCallback<T>): R;

  /**
   * 旧作业已从队列中清除
   * jobs 是一个被删除的工作数组，type 是这些工作的类型。
   *
   * @see Queue#clean() for details
   */
  (event: 'queue-cleaned', callback: CleanedEventCallback<T>): R;

  /**
   * 每次队列处理完所有等待作业时发出
   * 即使可能有一些尚未处理的延迟作业
   */
  (event: 'queue-drained', callback: EventCallback): R; // tslint:disable-line unified-signatures
};
