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
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === STATUS.REJECTED) {
      onRejected(this.reason);
    } else {
      // pending
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
