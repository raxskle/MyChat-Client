<h1 align="center">MyChat Client</h1>

<p align="center">

<img src="https://img.shields.io/badge/language-TypeScript-8A2BE2"/>

<img src="https://img.shields.io/badge/React-18.2.0-087EA4"/>

<img alt="License" src="https://img.shields.io/github/license/raxskle/MyChat-Client?color=64EDAC">

<img alt="last-commit" src="https://img.shields.io/github/last-commit/raxskle/MyChat-Client/main?color=FEFEFE"/>

<img alt="repo-size" src="https://img.shields.io/github/repo-size/raxskle/MyChat-Client?color=blue"/>

</p>

## About

腾讯微信客户端开发菁英班结课作业，迷你即时聊天应用的客户端。

使用跨端技术进行安卓移动端开发。开发环境原本由 React Native CLI 迁移至 expo。

## Technologies

本 Project 使用到的技术：

- React Native 及相关生态
- TypeScript
- WebSocket(socket.io)
- Redux

## todo

- [已完成] 发送图片等类型消息
- [已完成] 自定义用户信息
- [已完成] 群组聊天 : 创建群聊，服务端，客户端
- [已完成] 新增好友和群组，使用 websocket 通知对方在线的 client
- [已完成] 聊天信息送达确认，显示发送 pending 状态
- [已完成] 已读和未读消息状态区分
- [已完成] 搜索功能，聊天记录/朋友/群聊

## Features

- 基本还原微信 app 界面样式
- 支持双人/多人在线即时通信，包括文字和图片聊天
- 支持离线接收信息，登录后可查看离线期间收到的消息
- 简易支持用户注册登录，可自定义用户名和头像等用户信息
- 支持搜索聊天记录
- 支持搜索通讯录、群聊列表

## How To Run

如果想运行本项目，可以参考 [文档](https://reactnative.dev/docs/environment-setup?guide=quickstart) 配置

```
# Clone this project
$ git clone https://github.com/raxskle/MyChat-Client.git

# Access
$ cd MyChat-Client

# Install dependencies
$ npm install

# Run the Expo
$ npx expo start

1. Install the [Expo Go](https://expo.dev/client) app on your Android phone.

2. connect to the same wireless network as your computer.

3. scan the QR code and run your app.

# If you want to start your application with virtual device
$ npm run android

That's it!
```

## License

This project is under license from [MIT](LICENSE.md).

Made with ❤️ by [Raxskle](https://github.com/raxskle).
