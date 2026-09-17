import { configureStore } from '@reduxjs/toolkit';
import tmsReducer from './tmsSlice';

export const store = configureStore({
  reducer: {
    tms: tmsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
