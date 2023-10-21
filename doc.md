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

群组聊天模块

```

Groups: Group[] // 需要根据userId找到他所有群组，也要通过群组Id找到所有member

Group: {
  id: string;
  name: string;
  member: userId[];
  groupChats: Chat[];
}

接口：

- 创建群组
params {
  member,
  name,
}

- 修改群组名字


websocket：

- sendGroupMsg
{
  id,
  chat
}

- receiveGroupMsg
{
  id,
  chat
}

与私聊同样的做法
socket上线时，将其放入以groupId为id 的 room 中，

发送消息时，存入数据库，并且通知当前所有在线的群组成员socket
收到消息更新数据

群组聊天需要存在User的groupChats字段


```

即时聊天模块：文字/图片/emoji 聊天，表情系统

// 单条聊天记录
Chat {
time: Date();
userId: string;
content: string;
type: "text" | "image"
}

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
