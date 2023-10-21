import { useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  addOneFriend,
  updateChatByOne,
  updateFriend,
  updateGroup,
  updateGroupChatByOne,
} from "../store/userSlice";
import { useEffect } from "react";
import { addGroup } from "../store/groupSlice";
import { addFriend } from "../store/friendSlice";

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

    // 通知加入群组
    socket.on("addGroup", (data) => {
      console.log("socket:addGroup:", data);
      // 更新user.groups字段
      dispatch(updateGroup({ group: { id: data.id, name: data.name } }));
      // 还需要更新groupSlice数据
      dispatch(addGroup({ group: data }));
    });

    // 通知新增朋友: 该接口仅被动加好友，主动加好友不会触发，而是通过http响应时更新数据
    socket.on("addFriend", (data) => {
      console.log("socket:addFriend:", data);
      // 新增朋友需要更新user.friends字段和user.chats字段和friendSlice数据
      dispatch(addOneFriend({ friend: data.id }));

      dispatch(
        addFriend({
          friend: data,
        })
      );
    });

    return () => {
      socket.off("receiveMsg");
      socket.off("receiveGroupMsg");
      socket.off("addGroup");
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
