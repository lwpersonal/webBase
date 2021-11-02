## 定时任务

### 简介

可以定时执行多个定时任务，依赖于 redis 管理状态，支持集群部署。

### 使用方式

1. 引入

```ts
import Schedule from './Schedule';
```

2. 初始化配置

```ts
const schedule = new Schedule({
  redis,
  name: 'alarm',
  jobs: ['exception', 'resource', 'api'].map(item => ({
    name: item,
    data: {},
  })),
});
```

3. 配置 process 处理函数。相同 name 的 job 会被相同 name 的 process 处理。可以传入 `*` 处理所有 name 的 job。

```ts
schedule.process('exception', async job => {
  return { data }
}.then(res => {
  console.log(res);
}).catch(err => console.log(err)));

// or
schedule.process('resource', async (job, done) => {
  try {
    job.progress(50);
    await sleep(25000);
    job.progress(100);
    done(null, { data });
  } catch(err) {
    done(err);
  }
});

// 所有 job 都会执行
schedule.process('*', async job => {
  // code
});

// 第二个参数传入 number 调整任务的并发执行次数，默认为 1
schedule.process('api', 4, async job => {
  // code
});
```

4. 启动定时任务

```ts
schedule.start();
```

### 相关文档

1. [bull](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md)
2. [node-schedule](https://www.npmjs.com/package/node-schedule)
3. [ioredis](https://github.com/luin/ioredis)

### 实例方法

1. schedule options

```ts
interface IScheduleOptions<T> {
  name: string; // 定时任务标识
  redisOpts: Redis.RedisOptions; // redis 配置，bull 某些操作需要新的 redis 实例
  redis: Redis.Redis; // redis 实例，可以复用的 redis 引用
  rule: TScheduleJobRule; // 定时任务时间 rule，详情见 node-schedule 官网
  cleanDelay: number; // 定时清理多少毫秒前完成的 job，默认 30000
  jobs?: TQueueJob<T>[]; // 需要执行的任务配置
  getJobMark?: TType | (() => string); // 获取 jobId 标识
  queueOpts?: Omit<QueueOptions, 'createClient' | 'redis' | 'prefix'> | null; // 队列配置，详情见 bull 官网
}
```

`jobs` 用于配置队列中的任务。也可以使用 `schedule.setJobs(jobs)` 动态添加。

```ts
type TQueueJob<T> = {
  name: string;
  data: T;
  opts?: JobOptions | undefined; // 详情见 bull 官网
};
```

`getJobMark` 用于生成 jobId 的 mark，共有四种默认配置，对应「毫秒、分钟、小时、天」级别的时间戳，默认使用毫秒时间戳。也可以传入一个返回字符串的函数自定义 jobMark。

请确保相同 name 的 job 在定时任务周期内得到相同的 mark，不同 mark 的 job 会添加到队列中依次执行。

```ts
type TType = 'minute' | 'hour' | 'date';
// jobId 拼接规则
const jobId = `${jobMark}_${job.name}`;
```

1. Schedule 类

```ts
export default class Schedule<T extends Record<string, any>> {
  // 启动定时任务
  start: () => void;

  // 关闭定时任务
  cancel: () => boolean;

  // 清空未完成的任务队列，常用于启动实例前清空上一次未完成的任务
  cleanQueue: (force?: boolean) => Promise<void>;

  // 更改定时作业的时间，取消所有挂起的调用
  reschedule: (spec: Exclude<TScheduleJobRule, number>) => void;

  // 调整 job 列表。
  // 更新 job 列表后，会停止当前运行的 jobs，需手动调用 start() 启动。
  setJobs: (
    jobs: TQueueJob<T>[] | ((jobs: TQueueJob<T>[]) => TQueueJob<T>[]),
  ) => TQueueJob<T>[];

  // 任务队列处理函数
  process: TScheduleProcess;

  // 事件绑定
  on: TScheduleOn<TQueueJob<T>>;
}
```

#### process 函数用于处理队列中的任务。

```ts
type ProcessPromiseFunction<T> = (job: Job<T>) => Promise<void>;
type ProcessCallbackFunction<T> = (job: Job<T>, done: DoneCallback) => void;
type TScheduleProcess<T> = {
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
```

当我们配置多个 jobs 时，定时任务会根据 rule 规则定时将任务 push 到 queue 队列中。

```ts
['job1', 'job2', 'job3'].map(item => ({
  name: item,
  data: { test: item },
})),
```

使用 process 函数可以监听队列任务触发时如何处理。注意除非配置了 `*` 否则所有的 job 必须配置其 name 对应的 process。

```ts
schedule.process('job1', async (job, done) => {
  try {
    job.progress(50);
    await sleep(25000);
    job.progress(100);
    done(null, { data });
  } catch (err) {
    done(err);
  }
});

schedule.process('job2', async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});

schedule.process('job3', async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});
```

当配置了 `*` 时，没有默认配置的 jobName 会执行 `schedule.process('*', ...)`。如下示例，job1 触发 job1 的 process，job2、job3 没有配置具名的 process 会触发 `*` 的 process。

```ts
schedule.process('job1', async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});
schedule.process('*', async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});
```

当第二个参数为数字时，可以配置并发数量。默认并发为 1。

```ts
// 并发为 100
schedule.process('job1', 100, async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});

// 当同一队列中配置多个并发时，会累加。如下的代码每一个任务的并发为 125，如果需要单独的并发请实例化多个 Schedule。
schedule.process('job1', 100, async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});
schedule.process('job2', 25, async (job, done) => {
  try {
    done(null, { data });
  } catch (err) {
    done(err);
  }
});
```

#### on 用于绑定事件

- `finished`：同一批次的 queue 任务执行完成时触发，只可消费一次，触发后缓存清除
- `queue-*`：bull 原生事件

```ts
schedule
  .on('finished', results => {})
  .on('queue-completed', (_, result) => {
    console.log('queue-completed: ', result);
  })
  .on('started', data => {
    console.log('---- started', data[0]);
  });
```
