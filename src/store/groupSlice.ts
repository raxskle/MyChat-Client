import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FriendInfo } from "./friendSlice";

export interface GroupInfo {
  id: string;
  name: string;
  member: string[];
  memberInfo?: FriendInfo[]; // 暂时不需要
}

const initialGroups: { data: GroupInfo[] } = {
  data: [],
};

// 记录Group的基本信息
export const groupSlice = createSlice({
  name: "group",
  initialState: initialGroups,
  reducers: {
    setGroups: (state, action: PayloadAction<{ groups: GroupInfo[] }>) => {
      state.data = action.payload.groups;
    },
    // 用于在线时增加了group
    addGroup: (state, action: PayloadAction<{ group: GroupInfo }>) => {
      state.data.push(action.payload.group);
    },
  },
});

//
export const { setGroups, addGroup } = groupSlice.actions;
export default groupSlice.reducer;
