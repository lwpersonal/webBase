/* eslint-disable */
'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */
const Redis = require('ioredis');
const { redisConfig, log } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';
const createJobId = index => `jobId_${new Date().getTime()}_${index}`;
const key = `${QueueName}:list`;
let index = 0;
const pushJob = async (delay = 1000) => {
  const jobId = createJobId(index);
  log('推送任务: ', key, jobId);
  await redis.lpush(key, jobId);
  index++;
  setTimeout(() => pushJob(delay), delay);
};

setTimeout(() => pushJob(), 2000);
