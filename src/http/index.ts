import { Alert } from "react-native";

// 使用fetch即可
const base = "https://demo.raxskle.fun/api";

// 使用id和password获取用户信息
// 登陆时调用
export const getUserInfo = async (id: string, password: string) => {
  const user = await fetch(`${base}/login?id=${id}&password=${password}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("getUserInfo错误");
      return err;
    });

  console.log("http:getUserInfo:", user.msg);
  if (!user.data) {
    // 没返回数据
    Alert.alert(user.msg);
  }

  return user.data;
};

// 通过id得到freind的部分信息.
export const getFriendInfo = async (idList: string[]) => {
  const friends = await fetch(
    `${base}/get_friend_info?friends=${JSON.stringify(idList)}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("getFriendInfo错误");
      return err;
    });

  console.log("http:getFriendInfo:", friends);
  if (!friends.data) {
    // 没返回数据
    Alert.alert(friends.msg);
  }

  return friends.data;
};

// 添加好友
// 目前是由一方直接添加
export const addFriend = async (userId: string, friendId: string) => {
  const response = await fetch(
    `${base}/add_friend?user_id=${userId}&friend_id=${friendId}`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("addFriend错误");
      return err;
    });

  console.log("http:addFriend:", response.msg);

  return response;
};

// 修改头像
export const uploadAvator = async (data) => {
  const response = await fetch(`${base}/upload_avator`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("uploadAvator错误: ", err);
      return err;
    });

  // console.log("http:uploadAvator:", response);
  console.log("http:uploadAvator:");
  return response.data;
};

// 修改名字
export const updateName = async (name: string, id: string) => {
  const response = await fetch(`${base}/update_name?id=${id}&name=${name}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("updateName错误");
      return err;
    });

  console.log("http:updateName:", response);

  return response;
};

// 发起群聊
export const createGroup = async (name: string, member: string[]) => {
  const response = await fetch(`${base}/create_group`, {
    method: "POST",
    body: JSON.stringify({ name: name, member: member }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("createGroup错误");
      return err;
    });

  console.log("http:createGroup:", response);

  // response:
  // group:{id, name}
  return response;
};

// 获取群组信息，包括member
export const getGroupInfo = async (idList: string[]) => {
  const ids = JSON.stringify(idList);
  const groupInfo = await fetch(`${base}/get_group_info?groups=${ids}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("getGroupInfo错误");
      return err;
    });

  console.log("http:getGroupInfo:", groupInfo);

  return groupInfo;
};
