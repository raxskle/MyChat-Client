import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';

// 定义store，包含所有slice的reducer
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
