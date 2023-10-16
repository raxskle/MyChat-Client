/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/index';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Dimensions} from 'react-native';
import FriendItem from './FriendItem/FriendItem';
import {getCode} from '../../utils/getCode';
import {compare} from 'pinyin';
import {getFriendInfo} from '../../http';
import {NavigationProps} from '../../utils/types';
import {FriendInfo, setFriends} from '../../store/friendSlice';

const window = Dimensions.get('window');

function FriendPage({navigation}: NavigationProps): JSX.Element {
  const toChatPage = () => {
    console.log('press');
  };

  const toAddFriendPage = () => {
    navigation.navigate('AddFriend');
  };

  const toFriendProfilePage = (friendInfo: FriendInfo) => {
    navigation.navigate('FriendProfile', friendInfo);
  };

  const friendsId = useSelector((state: RootState) => state.user.user.friends);

  const friendList = useSelector((state: RootState) => state.friend.data);
  const dispatch = useDispatch();

  useEffect(() => {
    getFriendInfo(friendsId).then((res: FriendInfo[]) => {
      dispatch(
        setFriends({friends: [...res].sort((a, b) => compare(a.name, b.name))}),
      );
    });
  }, [friendsId, dispatch]);

  const codeList = [
    '↑',
    '☆',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '#',
  ];

  return (
    <View style={styles.wrap}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={styles.container}>
        <FriendItem
          avator={require('../../assets/AddFriend.png')}
          name={'新的朋友'}
          avatorColor={'green'}
          handlePress={toAddFriendPage}
        />
        <FriendItem
          avator={require('../../assets/UserInvisible.png')}
          name={'仅聊天的朋友'}
          avatorColor={'#eab308'}
          handlePress={toChatPage}
        />
        <FriendItem
          avator={require('../../assets/Group.png')}
          name={'群聊'}
          handlePress={toChatPage}
        />
        <FriendItem
          avator={require('../../assets/Tag.png')}
          name={'标签'}
          avatorColor={'#016da2'}
          handlePress={toChatPage}
        />

        {friendList.map((item, index) => {
          return (
            <View key={item.id}>
              {(index === 0 ||
                getCode(friendList[index - 1].name).toUpperCase() !==
                  getCode(item.name).toUpperCase()) && (
                <Text style={styles.gap}>
                  {getCode(item.name).toUpperCase()}
                </Text>
              )}
              <FriendItem
                avator={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
                name={item.name}
                handlePress={() => toFriendProfilePage(item)}
              />
            </View>
          );
        })}
        <View style={styles.btmBar}>
          <Text>{friendList.length}个朋友</Text>
        </View>
      </ScrollView>

      {/* 这部分单独拆组件无法显示 */}
      <View style={styles.bar}>
        {codeList.map(code => (
          <Text key={code} style={styles.char}>
            {code}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    elevation: 2,
    flex: 1,
    width: window.width,
  },
  wrap: {
    width: window.width,
    flex: 1,
    position: 'relative',
    zIndex: 2,
    elevation: 2,
  },
  gap: {
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 20,
  },
  bar: {
    zIndex: 20,
    elevation: 20,
    position: 'absolute',
    right: 0,
    top: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 30,
    flex: 1,
  },
  char: {
    fontSize: 12,
    color: '#030303',
    // color: 'black',
  },
  btmBar: {
    width: window.width,
    height: 60,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendPage;
