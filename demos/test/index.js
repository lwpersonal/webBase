function debounce(cb, delay) {
  let timer;
  return () => {
    if (!timer) {
      cb();
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
      timer = null;
    }, delay);
  };
}

function throttle(cb, delay) {
  let lastTime = 0;
  return () => {
    const nowTime = new Date().getTime();

    if (nowTime - lastTime >= delay) {
      lastTime = nowTime;
      cb();
    }
  };
}

// 数组转换为树
function jx() {
  let arr = [
    { id: 2, name: '2', pid: 1 },
    { id: 3, name: '3', pid: 1 },
    { id: 1, name: '1', pid: null },
    { id: 4, name: '4', pid: 3 },
    { id: 5, name: '5', pid: 3 },
  ];
  const res = [];
  const map = new Map();
  arr.forEach(item => {
    const { id, pid } = item;
    if (!item.children) {
      item.children = map.get(id) ? map.get(id).children : [];
      map.set(id, item);
    }

    const pMapItem = map.get(pid);
    if (pid === null) {
      res.push(item);
    } else {
      if (!pMapItem) {
        map.set(pid, { children: [item] });
      } else {
        pMapItem.children.push(item);
      }
    }
  });

  return res;
}

function curry(fn) {
  function handler(...args) {
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    } else {
      return handler.bind(this, ...args);
    }
  }
  return handler;
}

function main() {
  // TAG debounce
  // const fn1 = throttle(() => {
  //   console.log('scroll');
  // }, 1000);
  // TAG throttle
  // window.addEventListener('click', () => {
  //   console.log(111);
  //   fn1();
  // });
  // TAG 数组转换为树
  // jx();
  // TAG curry
  function add(a, b, c) {
    return a + b + c;
  }
  const fn = curry(add);
  console.log(fn(1)(2, 4));

  console.log(fn(1, 3)(2, 4));
  console.log(fn(1, 10)(4));
}
main();
