# 开发文档

基于跨端开发的 mini 微信

## 实现模块

- 注册登陆模块

User {
id: string;
name: string;
password: string;
avator: string;
friends: string[]; // 朋友 id 数组
chats: Record<string, Chat[]> // 私聊记录
groups: string[]; // 群组 id 数组
}

添加好友模块

创建群组模块

Groups: Record<string, Group> // 群聊记录集合

Group: {
id: string;
member: string; // userId
groupChats: Chat[];
}

即时聊天模块：文字/图片/emoji 聊天，表情系统

// 单条聊天记录
Chat {
time: Date();
userId: string;
content: string;
}

具体流程实现：

在 Login 执行登录之后，连接 socket 进入 online，当

搜索记录模块

\*朋友圈模块

## 页面

注册登陆页面 LoginPage

会话列表页面 ChatListPage

通讯录页面 FriendListPage

\*朋友圈页面 SharePage

我页面 UserPage

聊天页面 ChatPage

## API

```
注册/登陆
GET /login
params{
  userid
  password
}

添加好友
POST /addfriend
body{
  userid
  friendid
}

私聊聊天
socket "chat"
{
  userid
  friendid
  content
}
```
