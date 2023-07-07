function createStore(initState, reducer, rewriteCreateStoreFunc) {
  if (typeof rewriteCreateStoreFunc === 'function') {
    return rewriteCreateStoreFunc(createStore)(initState, reducer);
  }

  const listeners = [];
  let state = initState;

  function subscribe(listener) {
    listeners.push(listener);
  }

  function publish(nowState) {
    listeners.forEach(listener => {
      typeof listener === 'function' && listener(nowState);
    });
  }

  function dispatch(action) {
    state = reducer(state, action);
    publish(state);
  }

  function getState() {
    return state;
  }

  // dispatch({ type: Symbol() }); 生成默认 store

  return {
    subscribe,
    dispatch,
    getState,
  };
}

function combineReducers(reducers) {
  return function (state, action) {
    return Object.entries(reducers).reduce((res, [key, reduce]) => {
      res[key] = reduce(state[key], action);
      return res;
    }, state);
  };
}

function applyMiddleware(...middlewares) {
  return function rewriteFunc(oldCreateStore) {
    return function (initState, reduce) {
      const store = oldCreateStore(initState, reduce);
      let newDispatch = middlewares.reverse().reduce((res, middleware) => {
        res = middleware(store)(res);
        return res;
      }, store.dispatch);
      store.dispatch = newDispatch;
      return store;
    };
  };
}

// TEST
const reducer1 = function (state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    case 'ADD2':
      return { ...state, count: state.count + 2 };
    default:
      return state;
  }
};

const reducer2 = function (state, action) {
  switch (action.type) {
    case 'CHANGE_INFO':
      return { ...state, info: action.info };
    default:
      return state;
  }
};

const reducer = combineReducers({
  countState: reducer1,
  infoState: reducer2,
});

const loggerMiddleware = store => next => action => {
  console.log('loggerMiddleware start, ', action);
  next(action);
  console.log('loggerMiddleware end, ', action);
};
const loggerMiddleware2 = store => next => action => {
  console.log('loggerMiddleware2 start, ', action);
  next(action);
  console.log('loggerMiddleware2 end, ', action);
};

const rewriteCreateStoreFunc = applyMiddleware(
  loggerMiddleware,
  loggerMiddleware2
);

const initState = {
  countState: { count: 1 },
  infoState: { info: 'lw' },
};
const store = createStore(initState, reducer, rewriteCreateStoreFunc);
store.subscribe(state => {
  console.log('subscribe say: ', state);
});
store.dispatch({ type: 'ADD' });
store.dispatch({ type: 'CHANGE_INFO', info: 'lg' });

// store.reducer();
// store.dispatch({ type: 'ADD', count: 5 });
