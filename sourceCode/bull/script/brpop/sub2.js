/* eslint-disable */
'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */

const Redis = require('ioredis');
const { redisConfig, log } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';
const timeOut = 1000;
const key = `${QueueName}:list`;
const runJob = async (delay = 3000) => {
  const jobId = await redis.brpop(key, timeOut);
  log('sub2: ', jobId);
  // 需要 delay 执行完任务后，继续执行下一次
  setTimeout(() => runJob(delay), delay);
};
runJob(4000);
