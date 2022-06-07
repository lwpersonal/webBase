/**
 * 发布者
 */
class Publisher {
  constructor() {
    this.state = {};
    this.publishers = {};
    this.events = {};
  }

  getState() {
    return this.state;
  }
  setState(data) {
    this.state = { ...this.state, ...data };
    this.notify('update');
  }

  on(eventName, cb) {
    const id = `${eventName}_${new Date().getTime()}`;
    if (!Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
    this.events[eventName].push({ id, cb });
  }

  remove(eventName) {
    if (Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
  }

  notify(eventName) {
    if (Array.isArray(this.events[eventName])) {
      this.events[eventName].forEach(item => {
        const { cb } = item;
        typeof cb === 'function' && cb(this.state);
      })
    }
  }
}

class EventChannel {
  constructor(pub) {
    this.publisher = pub;
    this.subscriber = {};
    this.handlerEvent();
  }

  handlerEvent() {
    this.publisher.on('update', (state) => {
      if (!Object.keys(state).length) {
        this.notify('empty');
      } else {
        this.notify('update', state);
      }
    })
  }

  notify(eventName, state) {
    if (Array.isArray(this.subscriber[eventName])) {
      this.subscriber[eventName].forEach(fn => fn(state))
    }
  }

  addSubscriber(eventName, cb) {
    if(!Array.isArray(this.subscriber[eventName])) {
      this.subscriber[eventName] = [];
    }
    this.subscriber[eventName].push(cb);
  }
}

class Subscriber {
  constructor(options) {
    const { event, publisher, handler } = options;
    publisher.addSubscriber(event, handler);
  }
}

// 发布者
const p1 = new Publisher();
// 事件处理通道
const ec1 = new EventChannel(p1);
// 订阅者
const s1 = new Subscriber({
  key: 's1',
  event: 'update',
  publisher: ec1,
  handler: (state) => {
    console.log(`订阅者 s1, update 事件 ${JSON.stringify(state)}`)
  }
});
const s2 = new Subscriber({
  key: 's2',
  event: 'empty',
  publisher: ec1,
  handler: () => {
    console.log(`订阅者 s2, empty 事件`)
  }
});

p1.setState({ age: 1 });
p1.setState({ age: 2 });
p1.setState({ age: 4 });
