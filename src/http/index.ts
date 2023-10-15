import {Alert} from 'react-native';

// 使用fetch即可
const base = 'https://demo.raxskle.fun/api';

// 使用id和password获取用户信息
export const getUserInfo = async (id: string, password: string) => {
  const user = await fetch(`${base}/login?id=${id}&password=${password}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => {
      console.log('getUserInfo错误');
      return err;
    });
  console.log('getUserInfo:', user);
  if (!user.data) {
    // 没返回数据
    Alert.alert(user.msg);
  }

  return user.data;
};
