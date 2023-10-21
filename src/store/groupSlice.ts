import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FriendInfo } from "./friendSlice";

export interface GroupInfo {
  id: string;
  name: string;
  member: string[];
  memberInfo?: FriendInfo[];
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
  },
});

//
export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
