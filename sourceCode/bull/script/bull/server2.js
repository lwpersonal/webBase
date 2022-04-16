/* eslint-disable */
'use strict';

const Queue = require('../../lib/queue');
const { redisConfig, log, delayFn } = require('../utils');
const queueNames = [...Array(10).keys()].map(item => `testQueue_${item}`);
let index = 0;
const queue = new Queue(queueNames[0], {
  redis: redisConfig
});
queue.process(async (job, done) => {
  log(`开始处理 job：${job.id}`);
  await delayFn(3000);
  log(`处理完成：${job.id}`);
  done();
});

// 失败后的回调
queue.on('error', err => {
  log('error: ', err);
});

// job 开始活动
queue.on('active', job => {
  log(`job active, ${job.id}`);
});

// job 执行中
queue.on('progress', job => {
  log(`job progress, ${job.id}`);
});

// job 执行成功
queue.on('completed', job => {
  log(`job completed, ${job.id}`);
});

// job 执行失败
queue.on('failed', job => {
  log(`job failed, ${job.id}`);
});

const pushJob = async (queue, delay = 1000) => {
  const jobId = `jobId_${index}`;
  index++;
  log('推送任务: ', jobId);
  await queue.add({ testData: 1 }, { jobId });
  setTimeout(() => pushJob(queue, delay), delay);
};

pushJob(queue, 5000);
