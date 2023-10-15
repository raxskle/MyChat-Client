import io from 'socket.io-client';

const socket = io('https://demo.raxskle.fun', {});

// 准备接收消息
export const open = (id: string) => {
  socket.emit('online', id);
};

// 停止接收消息
export const close = (id: string) => {
  socket.emit('offline', id);
};

// 发送消息
interface Msg {
  to: string;
  from: string;
  content: string;
}
export const sendMsg = (data: Msg) => {
  socket.emit('sendMsg', data, (res: any) => {
    console.log(res);
  });
};
