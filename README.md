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

使用跨端技术进行安卓移动端开发，而非原生安卓开发。

## Technologies

本 Project 使用到的技术：

- React Native 及相关生态
- TypeScript
- WebSocket(socket.io)
- Redux

## Features

- 基本还原微信 app 样式
- 支持在线即时通信，基于 Socket.io 库实现
- 支持离线保存信息，登陆后可查看离线期间收到的消息
- 简易支持用户注册登陆
- 可自定义用户名与头像等用户信息

## How To Run

如果想运行本项目，首先确保已安装 Node.js(>=18)，JDK，Android Studio，并确保配置可以运行安卓原生项目，创建 Android 虚拟设备或真机调试。

按照文档 [React Native](https://reactnative.dev/docs/environment-setup) 安装 React Native CLI。

```
# Clone this project
$ git clone https://github.com/raxskle/MyChat-Client.git

# Access
$ cd MyChat-Client

# Install dependencies
$ npm install

# Run the Metro
$ npm start

Create another command line terminal

# Start your application
$ npm run android

That's it!
```

## License

This project is under license from [MIT](LICENSE.md).

Made with ❤️ by [Raxskle](https://github.com/raxskle).
