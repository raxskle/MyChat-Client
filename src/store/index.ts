import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import friendReducer from "./friendSlice";
import groupReducer from "./groupSlice";

// 定义store，包含所有slice的reducer
export const store = configureStore({
  reducer: {
    user: userReducer,
    friend: friendReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
