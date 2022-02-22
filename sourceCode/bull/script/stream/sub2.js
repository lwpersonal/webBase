/* eslint-disable */
'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */
const Redis = require('ioredis');
const { redisConfig, log, delayFn, checkGroupIsExist } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';
const key = `${QueueName}:stream`;
const runJob = async (delay = 3000) => {
  const groupName = 'group1';
  const groupExist = await checkGroupIsExist(groupName, key, redis);
  // 创建重复的组会报错，不存在时创建
  await (!groupExist && redis.xgroup('CREATE', key, 'group1', 1));
  // 读取消息队列
  const res = await redis.xreadgroup(
    'GROUP',
    'group1',
    'consumer2',
    'COUNT',
    2, // 每次读取两条
    'BLOCK',
    10000, // 阻塞式读取，阻塞毫秒数
    'STREAMS',
    key,
    '>' // 表示从第一条尚未被消费的消息开始读取
  );

  log('res 2: ', res);
  if (Array.isArray(res)) {
    const nowRedisKeyGroupArr = res.find(item => item[0] === key);
    const queues = nowRedisKeyGroupArr[1] || [];

    /* 任务处理逻辑 start*/
    await delayFn(delay);
    /* 任务处理逻辑 end */

    const ackArr = await Promise.all(
      queues.map(async item => {
        const jobId = item[0];
        // 处理完成后，标记任务为完成
        return await redis.xack(key, groupName, jobId);
      })
    );
    log('queues 2: ', queues);
    log('ackArr 2: ', ackArr);
  }
  // 需要 delay 执行完任务后，继续执行下一次
  // 或者没有读取到数据，继续阻塞等待
  runJob(delay);
};
runJob(2000);
