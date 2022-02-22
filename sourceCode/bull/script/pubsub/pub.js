/* eslint-disable */
'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */

const Redis = require('ioredis');
const { redisConfig } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';
/**
 * TAG 3、创建发布客户端
 */
redis.publish(QueueName, JSON.stringify({ id: 1, data: '发布的消息' }));

/**
 * NOTE 退出
 */
setTimeout(() => process.exit(1), 1000);
