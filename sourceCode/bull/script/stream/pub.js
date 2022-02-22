/* eslint-disable */
'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */
const Redis = require('ioredis');
const { redisConfig, log, delayFn } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';
const key = `${QueueName}:stream`;
let index = 0;
const pushJob = async (delay = 1000) => {
  const jobId = await redis.xadd(key, '*', 'count', 5, 'index', index);
  index++;
  log('推送任务: ', key, jobId, ' ', index);

  await delayFn(delay);
  pushJob(delay);
};

setTimeout(() => pushJob(), 2000);
