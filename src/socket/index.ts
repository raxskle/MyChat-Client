import {useDispatch} from 'react-redux';
import io from 'socket.io-client';
import {updateChatByOne} from '../store/userSlice';
import {useEffect} from 'react';

const socket = io('https://demo.raxskle.fun', {});

socket.on('connect', () => {
  console.log('socket:connect:成功 ', socket.id);
});

socket.on('error', error => {
  console.log('socket:error:', error);
});

// 接收消息
export const useReceiveMsg = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("set socket.on('receiveMsg')");

    socket.on('receiveMsg', data => {
      console.log('socket:receiveMsg:', data);
      dispatch(updateChatByOne({friendId: data.friendId, chat: data.chat}));
    });

    return () => {
      socket.off('receiveMsg');
    };
  }, [dispatch]);
};

// 准备接收消息
// params: userId
export const open = (id: string) => {
  socket.emit('online', id);
  console.log('socket:online');
};

// 停止接收消息
// params: userId
export const close = (id: string) => {
  socket.emit('offline', id);
  console.log('socket:offline');
};

// 发送消息
interface Msg {
  to: string;
  from: string;
  content: string;
}
export const sendMsg = (data: Msg) => {
  socket.emit('sendMsg', data);
  console.log('socket:sendMsg:', data);
};
