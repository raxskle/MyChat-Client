// 需要记录该user的信息
// 也就是该user在mongodb的document即可

// 应用 在登陆后 使用userSlice的数据，而该数据通过请求服务端得到，后续请求数据通过id请求
// 当修改数据时（比如增加聊天记录或者修改用户信息），携带修改数据向后端请求，响应user信息进行更新user
import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface ChatType {
  time: string;
  userid: string;
  content: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  friends: string[];
  chats?: Record<string, ChatType[]>;
}

const initialUser: {user: User} = {
  user: {
    _id: '',
    id: '',
    name: '未登录',
    friends: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<{user?: any}>) => {
      // 登陆加载user信息
      state.user = action.payload.user;
    },
    changeUserName: (
      state,
      action: PayloadAction<{
        name: string;
      }>,
    ) => {
      console.log(state, action.payload);
    },
    // 增加一个聊天信息
    updateChatByOne: (
      state,
      action: PayloadAction<{friendId: string; chat: ChatType}>,
    ) => {
      const {chat, friendId} = action.payload;
      if (state.user.chats) {
        state.user.chats[friendId].push(chat);
      } else {
        state.user.chats = {[friendId]: [chat]};
      }
    },
  },
});

//
export const {setUser, changeUserName, updateChatByOne} = userSlice.actions;
export default userSlice.reducer;
