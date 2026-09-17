import { configureStore } from '@reduxjs/toolkit';
import tmsReducer from './tmsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    tms: tmsReducer,
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
