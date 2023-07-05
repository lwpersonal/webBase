function promiseify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
}

Promise.resolve = function (value) {
  return new Promise(res => {
    res(value);
  });
};

Promise.reject = function (value) {
  return new Promise((res, rej) => {
    rej(value);
  });
};

Promise.prototype.finally = function (fn) {
  return this.then(r => {
    return Promise.resolve(fn()).then(() => r);
  }).catch(err => {
    return Promise.resolve(fn()).then(() => {
      throw new Error(err);
    });
  });
};

Promise.all = function (values) {
  if (!Array.isArray(values)) {
    throw new TypeError('args must be array');
  }
  return new Promise((resolve, reject) => {
    const resArr = [];
    let count = 0;

    values.forEach((value, index) => {
      Promise.resolve(value).then(item => {
        resArr[index] = item;
        if (++count === values.length) {
          resolve(resArr);
        }
      }, reject);
    });
  });
};

Promise.allSettled = function (values) {
  if (!Array.isArray(values)) {
    throw new TypeError('args must be array');
  }
  return new Promise((resolve, reject) => {
    const resArr = [];
    let count = 0;
    values.forEach((value, index) => {
      Promise.resolve(value).then(
        resItem => {
          resArr[index] = { value: resItem, state: 'fulfilled' };
          if (++count === values.length) {
            resolve(resArr);
          }
        },
        errItem => {
          resArr[index] = { state: 'rejected', value: errItem };
          if (++count === values.length) {
            resolve(resArr);
          }
        }
      );
    });
  });
};

Promise.race = function (values) {
  if (!Array.isArray(values)) {
    throw new TypeError('args must be array');
  }
  return new Promise((resolve, reject) => {
    values.forEach(value => {
      Promise.resolve(value).then(resolve, reject);
    });
  });
};
