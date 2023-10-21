import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { compare } from "pinyin";
export interface FriendInfo {
  id: string;
  name: string;
  avator: string;
}

const initialFriends: { data: FriendInfo[] } = {
  data: [],
};

// 记录friend的基本信息
export const friendSlice = createSlice({
  name: "friend",
  initialState: initialFriends,
  reducers: {
    // 加载friend信息
    setFriends: (state, action: PayloadAction<{ friends: FriendInfo[] }>) => {
      state.data = action.payload.friends;
    },
    // 用于在线时增加了朋友
    addFriend: (state, action: PayloadAction<{ friend: FriendInfo }>) => {
      state.data.push(action.payload.friend);
      state.data.sort((a, b) => compare(a.name, b.name));
      console.log("friendSlce更新", state.data);
    },
  },
});

//
export const { setFriends, addFriend } = friendSlice.actions;
export default friendSlice.reducer;
