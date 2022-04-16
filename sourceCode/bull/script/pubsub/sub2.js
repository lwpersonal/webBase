'use strict';
/**
 * redis 订阅发布（pub/sub）实现方案
 */

const Redis = require('ioredis');
const { redisConfig, log } = require('../utils');
const redis = new Redis(redisConfig);
const QueueName = 'queueTest:subscribe_client';

/**
 * TAG 1、创建监听客户端
 */
redis.subscribe(QueueName, () => log(`${QueueName} 2 创建成功`));

/**
 * TAG 2、监听订阅
 */
redis.on('message', (channel, message) => log(`${channel} 2 pub message: ${message}`));
redis.on('error', err => log(`channel 2 response error: ${err}`));
