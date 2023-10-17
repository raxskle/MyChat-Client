import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationProps} from '../../utils/types';

import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/index';

import {Dimensions} from 'react-native';

import {addFriend} from '../../http';
import {setUser} from '../../store/userSlice';
import {FriendInfo} from '../../store/friendSlice';

const window = Dimensions.get('window');

// 该页面经 通讯录页面 或 添加好友搜索 进入，route.params 需要携带FriendInfo类型信息
function FriendProfilePage({route, navigation}: NavigationProps): JSX.Element {
  const friendInfo: FriendInfo = route.params;

  const dispatch = useDispatch();

  if (!friendInfo) {
    navigation.goBack();
  }

  const userId = useSelector((state: RootState) => state.user.user.id);

  // 该用户已经添加通讯录的朋友
  const existIdList = useSelector(
    (state: RootState) => state.user.user.friends,
  );

  const isFriend = existIdList.includes(friendInfo.id);

  return (
    <View style={styles.container}>
      <View style={styles.friend}>
        <Image
          style={styles.avator}
          source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
        />
        <View>
          <Text style={styles.name}>{friendInfo.name}</Text>
          <Text style={styles.id}>微信号：{friendInfo.id}</Text>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.text}>设置备注和标签</Text>
      </View>

      <View style={styles.gap} />

      {isFriend ? (
        <Pressable
          onPress={() => {
            navigation.navigate('Chat', {friendId: friendInfo.id});
          }}>
          <View style={styles.item}>
            <Text style={styles.highlight}>发消息</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            addFriend(userId, friendInfo.id).then(res => {
              Alert.alert(res.msg);
              dispatch(setUser({user: res.data}));
            });
          }}>
          <View style={styles.item}>
            <Text style={styles.highlight}>添加到通讯录</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    width: window.width,
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 55,
  },
  friend: {
    width: window.width,
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 60,
    flexDirection: 'row',
  },
  avator: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  name: {
    fontSize: 22,
    color: '#131313',
    marginBottom: 8,
  },
  id: {},
  item: {
    backgroundColor: 'white',
    width: window.width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#F3F3F3',
    borderTopWidth: 1,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
  },
  text: {
    color: '#030303',
    fontSize: 16,
  },
  gap: {
    height: 10,
  },
  highlight: {
    color: '#074564',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FriendProfilePage;
