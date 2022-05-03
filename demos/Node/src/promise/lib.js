const {
  STATUS_CODES
} = require("http");
const { resolve } = require("path");

/**
 * 状态：pending、fulfilled、rejected
 */
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let called = false;
      const then = x.then;
      if (typeof then === 'function') {
        // x 是 promise
        console.log('--==')
        then.call(x, y => {
          if (called) {
            return;
          }
          called = true;
          resolvePromise(promise2, y, resolve, reject);
          // return resolve(y)
        }, r => {
          if (called) {
            return;
          }
          called = true;
          reject(r)
        });
      } else {
        resolve(x);
      }
    } catch(e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status !== STATUS.PENDING) {
        return;
      }
      this.status = STATUS.FULFILLED;
      this.value = typeof value === 'function' ? value() : value;
      this.onResolvedCallbacks.forEach(fn => fn());
    }
    const reject = (reason) => {
      if (this.status !== STATUS.PENDING) {
        return;
      }
      this.status = STATUS.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn());
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

  }

  then(onFulfilled, onRejected) {
    const p2 = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            let x = typeof onFulfilled === 'function' ? onFulfilled(this.value) : void 0;
            // resolve(x);
            resolvePromise(p2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            let x = typeof onRejected === 'function' ? onRejected(this.reason) : void 0;
            // resolve(x);
            resolvePromise(p2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else {
        // pending
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = typeof onFulfilled === 'function' ? onFulfilled(this.value) : void 0;
              // resolve(x);
              resolvePromise(p2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = typeof onRejected === 'function' ? onRejected(this.reason) : void 0;
              // resolve(x);
              resolvePromise(p2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return p2;
  }
}

module.exports = Promise;