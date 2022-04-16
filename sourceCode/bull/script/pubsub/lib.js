'use strict';
const Redis = require('ioredis');
const { redisConfig } = require('../utils');
const redis = new Redis(redisConfig);

redis.lpush();

class Publisher {
  constructor(options) {
    const { name, redis } = options;
    this.redis = redis;
    this.name = name;
    this.commonKey = `pubsub:queue:${name}:`;
    this.init();
  }
  init() {
    // 重新执行未完成的任务
  }
  createJobId() {}
  async push() {
    const jobId = this.createJobId();
    const key = `${this.commonKey}jobId`;
    await this.redis.lpush(key, jobId);
  }
}

class Subscribe {}

module.exports = {
  Publisher,
  Subscribe
};

const pub1 = new Publisher({
  name: 'test',
  redis
});
const pub2 = new Publisher();

pub1.add();
pub2.add();

const sub1 = new Subscribe();
const sub2 = new Subscribe();

sub1.on('process', () => {});
sub2.on('process', () => {});
