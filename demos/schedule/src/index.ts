import * as Redis from 'ioredis';
import Schedule from './Schedule';
import { SCHEDULE_TIMES, REDIS_CONFIG, BULK_ARR } from './Const';
import { sleep } from './utils';

const redis = new Redis(REDIS_CONFIG);

const createTestSchedule = (mark: string) => {
  const schedule = new Schedule({
    redis,
    redisOpts: { ...REDIS_CONFIG },
    name: 'alarm',
    getJobMark: 'minute',
    jobs: BULK_ARR.map(item => ({
      name: item,
      data: { age: 10, type: 11111 },
    })),
    rule: SCHEDULE_TIMES.EVERY_1M,
    queueOpts: {
      defaultJobOptions: {
        backoff: 0, // 失败重试次数
        attempts: 1, // 尝试次数
      },
      limiter: {
        // 速率配置
        max: 4,
        duration: 100,
      },
    },
  });

  schedule.process('*', 100, async (job, done) => {
    console.log(`---- ${mark} process ---- `, job.data.type);
    await sleep(15 * 1000);
    console.log(`**** ${mark} process **** `, job.data.type);
    if (job.data.type === 'api') {
      done(new Error('error test wjw'), { type: job.data.type });
    }
    done(null, { type: job.data.type });
  });

  schedule.process('exception', async (job, done) => {
    console.log(`---- ${mark} exception 0000000000`);
    await sleep(10 * 1000);
    console.log(`${mark} exception 0000000000`);
    done(null, { type: job.data.type });
  });
  schedule.cleanQueue().then(async () => {
    console.log(`**** ${mark} start **** `);
    schedule.start();
  });
  schedule.on('finished', results => {
    console.log(`**** ${mark} finished **** `);
  });
  return schedule;
};

createTestSchedule('1');
createTestSchedule('2');
