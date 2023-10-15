/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Dimensions} from 'react-native';
import FriendItem from './FriendItem/FriendItem';
import {getCode} from '../../utils/getCode';
import {compare} from 'pinyin';

const window = Dimensions.get('window');

function FriendPage(): JSX.Element {
  const toChatPage = () => {
    console.log('press');
  };

  const [friendList, setFriendList] = useState(
    [
      'bbB',
      'bbb',
      'ccc',
      'Ccc',
      'ccc',
      '冰冰',
      'ddd',
      'ddd',
      'ddd',
      'zzz',
      'zzz',
      '游牧人',
    ].sort(compare),
  );
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
          avator={'https://blog.raxskle.fun/images/mie.png'}
          name={'新的朋友'}
          handlePress={toChatPage}
        />
        <FriendItem
          avator={'https://blog.raxskle.fun/images/mie.png'}
          name={'仅聊天的朋友'}
          handlePress={toChatPage}
        />
        <FriendItem
          avator={'https://blog.raxskle.fun/images/mie.png'}
          name={'群聊'}
          handlePress={toChatPage}
        />
        <FriendItem
          avator={'https://blog.raxskle.fun/images/mie.png'}
          name={'标签'}
          handlePress={toChatPage}
        />

        {friendList.map((item, index) => {
          return (
            <View key={Math.random()}>
              {(index === 0 ||
                getCode(friendList[index - 1]).toUpperCase() !==
                  getCode(item).toUpperCase()) && (
                <Text style={styles.gap}>{getCode(item).toUpperCase()}</Text>
              )}
              <FriendItem
                avator={'https://blog.raxskle.fun/images/mie.png'}
                name={item}
                handlePress={toChatPage}
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
