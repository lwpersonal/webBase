/* eslint-disable */
'use strict';

const Queue = require('../lib/queue');
const { redisConfig, log } = require('./utils');
const queueNames = [...Array(10).keys()].map(item => `testQueue_${item}`);
let index = 0;
const createJobId = index => `jobId_${new Date().getTime()}_${index}`;
/**
 * TAG queue 1
 */
const queue1 = new Queue(queueNames[0], {
  redis: redisConfig
});
queue1.process(async job => {
  log('queue 1: ', job.id);
  return 1;
});

/**
 * TAG queue 2
 */
const queue2 = new Queue(queueNames[0], {
  redis: redisConfig
});
queue2.process(async job => {
  log('queue 2: ', job.id);
  return 1;
});

const pushJob = async (queue, delay = 1000) => {
  const jobId = createJobId(index);
  log('推送任务: ', jobId);
  await queue.add({ testData: 1 }, { jobId });
  index++;
  setTimeout(() => pushJob(queue, delay), delay);
};

pushJob(queue1);
