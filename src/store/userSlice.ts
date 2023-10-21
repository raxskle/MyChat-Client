// 需要记录该user的信息
// 也就是该user在mongodb的document即可

// 应用 在登陆后 使用userSlice的数据，而该数据通过请求user得到
// 当修改数据时（比如增加聊天记录、修改用户信息、添加好友等），携带修改数据向服务端请求，响应修改后user信息进行更新user
// 除websocket以外的请求，所有数据更新跟随请求后的响应，不需要主动单独请求数据保持最新
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChatType {
  time: string;
  userid: string;
  content: string;
  type: "text" | "image";
}

export interface User {
  _id: string;
  id: string;
  name: string;
  avator: string;
  friends: string[];
  chats?: Record<string, ChatType[]>;
  groups: { id: string; name: string }[];
  groupChats?: Record<string, ChatType[]>;
}

const initialUser: { user: User } = {
  user: {
    _id: "",
    id: "",
    name: "未登录",
    avator:
      "data:image/webp;base64,UklGRjgHAABXRUJQVlA4ICwHAADwmgCdASpYAlgCPolEoEulI6MionRoeKARCWlu4XPxG/OBpdP5cGoBlE0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGK+hbjLGS8qKj0n4qvQAzkxIx4jSRjxGkjHiNI6YCT/4kQlgbXdo0C5NP6Ukfw+ZoT0AHgWUUIss2f6VvjyvQ0kY8Ro5rr9xaqUBHdNJEViEkhJ5KyMw2yV6oFM2bZXCODH+lb48r0NJGPEPwXsgiJL3ctVzXgAAUTuFmBpnZIl6NfN6rDC1BGYmkjHiNJGPEaNzaWmOCoKaEFJkzzjHiNHFxOA2nojjHSk17fEXoaSMeI0kY8RlwmRHYpaqWvIpvChpIrOdKFG5ZOs3m8r0NJGPEaSBFEFK6JytRgmNK5yh3m72D8dWG4nFmgxhkZfTnDzRl0XgChpIx4jSRjxGYGwpeDqXrrLG9FpzW4rvu+kY6nhsTZDnbYe0KsY8RpIx4jSPBzHBIH6BZk0DwBPkKyqxnbCObRQS8Rir3WJpIx4jSRjxEEPqd2tdGxhtw/XiM70FkvH61hDoUURQzvSmqHuQGXRpIx4jSRjxGeLTYO/oDht9JIyE2Obo14Olg/0slt/v9K3x5XoaSMV+Vrs3HkQ0GVfNXV/50VqwfU8egO1vhakb76hkThHEA82f6VvjyvQ0kVz5VkjluzgbuY7+teUx4rFjbGwXriHuq7NKUyx7IdS0nI9gw6JWwTrABgx/pW+PK9DSRirg4FxqnJJbPdKORgDKiwP7LgaDYZ1Z/hyOehzdiDCmhXiY+WUabHTAVqwoaSMeI0kY8Ro4afhKq86ygYexf8vm8GcYDFTV0LhgkqZmJpIx4jSRjxGkgOAzXor1GL0oRkgP0rMtb0v46pDXT1nbjyvQ0kY8RpIx4jUMqpmY0NBzSro8lkOXOQW3lc/PoTDmRd7zcIQoQwd/pW+PK9DSRjxGWhLwgT7ilfo3b0KlNjHhLmSy2CF0WjriPfR4YGMUDsd2hMSMeI0kY8Ro4UDGu//7uA787/sfbH9xUmKSPRMOWDJmg1XkrZKrzRH1XwGs5ZnzlBIEjHiNJGPEaNsvglohS1AueznDdIx4jRuO+X8kb1hwer+xC9IQheB9iaSMeFW68xLD4gAeRi9DSRjxGkd4XsV75+DZXXQiMOzEDSRjxGkeNRwn1rYOmEbL4ZiRjxGkjHiPOzuYjAb9bzWpCIO65yHvQ0kY8Q/AuRuSYoFvtmTgBiaSMeI0kY8RmO28CcNEzniPVKT+hKYmkjHV3BkYUQzt5ZsLwPsTSRjxGkjPyHfzyHREKXi4Kwkqt8670NJFXAL6pmGfkGox4jSRjxGkjHiMv+qYwDXae5O/DPYUPsTRxeYNtjFL4e9TPQPsTSRjxGkjHiMwNLjTy1yaja6m8KGW2mhIpy8tvN5XoaSMeI0kY8Q+3GmalaEfHlehpIx4jSRjxGkjHiNJKA6ukjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaSMeI0kY8RpIx4jSRjxGkjHiNJGPEaR0AA/v7csAAAAAAAAAANKA8fMaBVbhw9GnM4qmQ55xhuOGIoVicUPOCvTwYA1UaoxesieuJ4RteG6w+O7ObXtTb0a+5vUQjRNIGQqjp0qVxXQDn6B1hzyRH0kGOIYyEbSZ2AWWGznW9YFhfiMvi1T3sDqGgjgMQEN2yzIdB9i6RZTBTetFFhjmAE1/z3DU78JST3uDqHma8sUKXpDEOScuAmOa2jstMxJ47XhRktqiYvF/TBXyTgr4Vo9WbNMeA9qMZtaCOsRiRP3mEHUPFLQurQsJ7cPeE58c27hJT6ooqQt+Ti1VPeQuySSs7g3S3X+NOMC+MmJ0OH+Pw1grsagClSLxxy6+0lBYhERWcDphWHFVf3GJ+XNUAyyaLBKMBh9zZWxVQmGGfKQLdQxKtfvFFmwqrqSHHgNY+5Gw4Lx6zj/M9Vg4HdkmNXhcwtexBR4BKUQAnSVxDieoqtJxqUDmciT8auhu+HAdF3ge+s3RiubE3YnAbA2jimvYbo43Jh6aBV2wiAj0rGCmFWJv0IhvmY3k7ntVxAyGHlI5zuZQgZqyd7JLfhPa02cot6LNAI3iqPaqSUvuMszRJ9V2tG46oEdo+4zIQlW61vEJSy64nfI5dbbo2aaSljBeTpDJwOsA6/dYi6pRY4O6slw3E6td6N3Y3oYDvlCnwgJorCjjUoj4KvVd2u01tEQCwfCKR9ug/91gnpyUuHwYgcPsGb/4nAGrdpdJ6tSWNgU2XUYOo6bFyhsXcSBt+zMHkf9yqXLOMzH0opgAAAAAAAAAA=",
    friends: [],
    chats: {},
    groups: [],
    groupChats: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<{ user?: any }>) => {
      // 登陆加载user信息
      state.user = action.payload.user;
    },
    changeUserName: (
      state,
      action: PayloadAction<{
        name: string;
      }>
    ) => {
      state.user.name = action.payload.name;
    },
    changeUserAvator: (
      state,
      action: PayloadAction<{
        avator: string;
      }>
    ) => {
      state.user.avator = action.payload.avator;
    },
    // 增加一个聊天信息
    updateChatByOne: (
      state,
      action: PayloadAction<{ friendId: string; chat: ChatType }>
    ) => {
      const { chat, friendId } = action.payload;
      if (state.user.chats) {
        state.user.chats[friendId].push(chat);
      } else {
        state.user.chats = { [friendId]: [chat] };
      }
    },
    // 增加群聊
    updateGroup: (
      state,
      action: PayloadAction<{ group: { name: string; id: string } }>
    ) => {
      const { group } = action.payload;
      state.user.groups.push(group);
      if (state.user.groupChats) {
        state.user.groupChats[group.id] = [];
      } else {
        state.user.groupChats = { [group.id]: [] };
      }
    },
  },
});

//
export const {
  setUser,
  changeUserName,
  updateChatByOne,
  changeUserAvator,
  updateGroup,
} = userSlice.actions;
export default userSlice.reducer;
