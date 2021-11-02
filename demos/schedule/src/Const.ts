export const SCHEDULE_TIMES = {
  EVERY_10S_INT: '0,10,20,30,40,50 * * * * ?', // 每隔 10s 执行一次，整秒
  EVERY_10S: '*/10 * * * * ?', // 每隔 10s 执行一次
  EVERY_1M: '0 * * * * ?', // 每分钟 0s 执行一次
  EVERY_1D_0H: '0 10 0 * * ?', // 每天 0:10 执行一次

  EVERY_1M_AT_5: '5 * * * * ?', // 每分钟 5s 执行一次
  EVERY_5S_INT: '0,5,10,15,20,25,30,35,40,45,50,55 * * * * ?', // 每隔 10s 执行一次，整秒
};

export const BULK_ARR = [
  'exception',
  'api',
  'resource',
  'pv',
  'uv',
  'lcp',
  'fcp',
  'performance',
  'error',
  'apiCount',
  'avgCount',
  'exception1',
  'api1',
  'resource1',
  'pv1',
  'uv1',
  'lcp1',
  'fcp1',
  'performance1',
  'error1',
  'apiCount1',
  'avgCount1',
];
