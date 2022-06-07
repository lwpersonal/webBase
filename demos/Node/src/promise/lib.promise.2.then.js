const { STATUS_CODES } = require("http");

/**
 * 状态：pending、fulfilled、rejected
 */
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
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
    } catch(err) {
      reject(err);
    }

  }

  then(onFulfilled, onRejected) {
    const p2 = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        try {
          let x = typeof onFulfilled === 'function' ? onFulfilled(this.value) : void 0;
          resolve(x);
        } catch(err) {
          reject(err);
        }
      } else if (this.status === STATUS.REJECTED) {
        try {
          let x = typeof onRejected === 'function' ? onRejected(this.reason) : void 0;
          resolve(x);
        } catch(err) {
          reject(err);
        }
      } else {
        // pending
        this.onResolvedCallbacks.push(() => {
          try {
            let x = typeof onFulfilled === 'function' ? onFulfilled(this.value) : void 0;
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = typeof onRejected === 'function' ? onRejected(this.reason) : void 0;
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });
      }
    });
    return p2;
  }
}

module.exports = Promise;
