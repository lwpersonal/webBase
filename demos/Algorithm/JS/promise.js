Promise.resolve = function (value) {
  return new Promise(res => res(value));
};

Promise.reject = function (value) {
  return new Promise((res, rej) => rej(value));
};

Promise.prototype.finally = function (cb) {
  
};

Promise.all = function (values) {
  return new Promise((res, rej) => {
    let result = [];
    let count = 0;
    values.forEach((value, index) => {
      Promise.resolve(value).then(r => {
        result[index] = r;
        count++;
        if (count === values.length) {
          res(result);
        }
      }, rej);
    });
  });
};

Promise.race = function (values) {
  return new Promise((res, rej) => {
    values.forEach(value => {
      Promise.resolve(value).then(res, rej);
    });
  });
};

Promise.allSettled = function (values) {
  return new Promise((res, rej) => {
    let result = [];
    let count = 0;
    values.forEach((value, index) => {
      Promise.resolve(value)
        .then(r => {
          result[index] = { state: 'fulfilled', value: r };
          count++;
          if (count === values.length) {
            res(result);
          }
        })
        .catch(err => {
          result[index] = { state: 'rejected', value: err };
          count++;
          if (count === values.length) {
            res(result);
          }
        });
    });
  });
};
