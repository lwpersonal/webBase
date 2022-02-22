/* eslint-disable */
const { redisConfig } = require('./58config');
const log = (...args) => console.log('「test queue log」', ...args);

/**
 * 判断组是否存在
 */
const checkGroupIsExist = async (groupName, redisKey, redisClient) => {
  const xgroups = await redisClient.xinfo('GROUPS', redisKey);
  return xgroups.some(itemArr => {
    // 找到 name 字段的索引
    const nameIndex = itemArr.findIndex(item => item === 'name');
    // name 下一个字段为 groupName
    const name = nameIndex !== -1 ? itemArr[nameIndex + 1] : undefined;
    return name && name === groupName;
  });
};

const delayFn = (delay = 1000) => new Promise(r => setTimeout(r, delay));

module.exports = {
  log,
  delayFn,
  redisConfig,
  checkGroupIsExist
};
