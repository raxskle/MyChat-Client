import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { updateChatByOne, updateGroupChatByOne } from "../store/userSlice";
import { useEffect } from "react";

const socket = io("https://demo.raxskle.fun", {});

socket.on("connect", () => {
  console.log("socket:connect:成功 ", socket.id);
});

socket.on("error", (error) => {
  console.log("socket:error:", error);
});

// 接收消息
export const useReceiveMsg = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("set socket.on('receiveMsg')");

    socket.on("receiveMsg", (data) => {
      console.log("socket:receiveMsg:", data);
      dispatch(updateChatByOne({ friendId: data.friendId, chat: data.chat }));
    });

    socket.on("receiveGroupMsg", (data) => {
      console.log("socket:receiveGroupMsg:", data);
      dispatch(
        updateGroupChatByOne({ groupId: data.groupId, chat: data.chat })
      );
    });

    return () => {
      socket.off("receiveMsg");
      socket.off("receiveGroupMsg");
    };
  }, [dispatch]);
};

// 准备接收消息
// params: userId
export const open = (id: string) => {
  socket.emit("online", id);
  console.log("socket:online");
};

// 停止接收消息
// params: userId
export const close = (id: string) => {
  socket.emit("offline", id);
  console.log("socket:offline");
};

// 发送消息
interface Msg {
  to: string;
  from: string;
  content: string;
  type: "text" | "image";
}
export const sendMsg = (data: Msg) => {
  socket.emit("sendMsg", data);
  console.log("socket:sendMsg:", data);
};

interface GroupMsg {
  groupId: string;
  speaker: string;
  content: string;
  type: "text" | "image";
}

export const sendGroupMsg = (data: GroupMsg) => {
  socket.emit("sendGroupMsg", data);
  console.log("socket:sendGroupMsg:", data);
};
