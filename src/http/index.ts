import {Alert} from 'react-native';

// 使用fetch即可
const base = 'https://demo.raxskle.fun/api';

// 使用id和password获取用户信息
// 登陆时调用
export const getUserInfo = async (id: string, password: string) => {
  const user = await fetch(`${base}/login?id=${id}&password=${password}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => {
      console.log('getUserInfo错误');
      return err;
    });

  console.log('http:getUserInfo:', user);
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
      method: 'GET',
    },
  )
    .then(res => res.json())
    .catch(err => {
      console.log('getFriendInfo错误');
      return err;
    });

  console.log('http:getFriendInfo:', friends);
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
    {method: 'GET'},
  )
    .then(res => res.json())
    .catch(err => {
      console.log('addFriend错误');
      return err;
    });

  console.log('http:addFriend:', response.msg);

  return response;
};
