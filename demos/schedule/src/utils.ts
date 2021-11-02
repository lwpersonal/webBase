import * as moment from 'moment';
import type * as Redis from 'ioredis';

export const sleep = (delay = 1000) => {
  return new Promise(r => setTimeout(() => r(void 0), delay));
};

type TType = 'minute' | 'hour' | 'date';
/**
 * 获取时间戳
 */
export const getTimestamp = (type?: TType, time = new Date()) => {
  if (!type) {
    return time.getTime();
  }
  const handler = [
    {
      match: (type?: string) => type === 'minute',
      active: () => {
        const timeStr = moment(time).format('YYYY-MM-DD HH:mm:00');
        return new Date(timeStr).getTime();
      },
    },
    {
      match: (type?: string) => type === 'hour',
      active: () => {
        const timeStr = moment(time).format('YYYY-MM-DD HH:00:00');
        return new Date(timeStr).getTime();
      },
    },
    {
      match: (type?: string) => type === 'date',
      active: () => {
        const timeStr = moment(time).format('YYYY-MM-DD 00:00:00');
        return new Date(timeStr).getTime();
      },
    },
  ];

  for (let i = 0, len = handler.length; i < len; i++) {
    const { match, active } = handler[i];
    if (match(type)) {
      return active();
    }
  }
  return time.getTime();
};

/**
 * 生成随机字符串
 *
 * @param {number} num 生成的随机字符串长度
 * @param {object} options 配置项 { baseStr: 基础字符集, suffix: 后缀 }
 */
export const randomStr = (
  num = 8,
  options: {
    baseStr?: string;
    suffix?: string;
  } = {},
): string => {
  const {
    baseStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    suffix = '',
  } = options;
  let result = '';
  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * baseStr.length);
    result += baseStr.charAt(index);
  }
  return result + suffix;
};

/** TODO 时间非常久，需要调整
 * 批量删除 redis key
 */
export const batchDelKeyOnStream = async (
  keyReg: string,
  redis: Redis.Redis,
) => {
  if (typeof !keyReg === 'string') {
    throw new Error('请传入正确的 keyReg');
  }
  return new Promise((resolve, reject) => {
    const stream = redis.scanStream({
      match: keyReg,
    });
    stream.on('data', keys => {
      if (!keys.length) {
        return;
      }
      const pipeline = redis.pipeline();
      keys.forEach((key: string) => {
        pipeline.del(key);
      });
      pipeline.exec();
    });
    stream.on('end', () => resolve(true));
    stream.on('error', error => reject(error));
  });
};
