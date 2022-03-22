import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './services/pokemon';

import userReducer from './slice/user';
import counterReducer from './slice/counter';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,

    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
