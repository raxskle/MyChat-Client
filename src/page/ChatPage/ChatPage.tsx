import React, {useEffect, useRef, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
} from 'react-native';

import {Dimensions} from 'react-native';
import GreenChat from './GreenChat/GreenChat';
import WhiteChat from './WhiteChat/WhiteChat';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import {NavigationProps} from '../../utils/types';

import {sendMsg} from '../../socket';
// import {sendMsg} from '../../socket';

const window = Dimensions.get('window');

const voiceIcon = require('../../assets/ChatPage/voice2.png');
const faceIcon = require('../../assets/ChatPage/smile.png');
const moreIcon = require('../../assets/ChatPage/more.png');

interface RouteParams {
  friendId: string;
}

function ChatPage({route, navigation}: NavigationProps): JSX.Element {
  const {friendId}: RouteParams = route.params;

  // 对方的信息
  const friendInfo = useSelector((state: RootState) => {
    return state.friend.data.find(item => item.id === friendId);
  });
  // 自己的信息
  const user = useSelector((state: RootState) => state.user.user);

  const chat = user.chats?.[friendId] || [];

  if (user.id === '' || !friendInfo || !chat) {
    navigation.navigate('Login');
  }

  // 输入的信息
  const [text, setText] = useState('');

  useEffect(() => {
    // 设置标题
    navigation.setOptions({
      title: friendInfo?.name || '微信聊天',
    });
  }, [friendInfo, navigation]);

  // 发送
  const handleSend = () => {
    if (text.length > 0) {
      console.log('handle send');
      // 发送
      sendMsg({
        to: friendId,
        from: user.id,
        content: text,
      });
      setText('');
      scrollViewRef.current?.scrollToEnd({animated: true});
    }
  };

  // 滚动到底部
  const scrollViewRef = useRef<ScrollView>(null);
  // 初始进入时滚动
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: false});
  }, []);
  // 有新消息时滚动
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollview]}>
        {chat.map(item => {
          if (item.userid === user.id) {
            // 自己的消息
            return <GreenChat key={Math.random()} chat={item} avator={''} />;
          } else if (item.userid === friendId) {
            // 对方的消息
            return <WhiteChat key={Math.random()} chat={item} avator={''} />;
          }
        })}
        <View style={styles.gap} />
      </ScrollView>

      <View style={styles.btmBar}>
        <Image style={styles.leftBtn} source={voiceIcon} />
        <TextInput
          style={styles.inputBox}
          placeholder=""
          onChangeText={newText => setText(newText)}
          defaultValue={text}
          onFocus={() => {
            scrollViewRef.current?.scrollToEnd({animated: true});
          }}
          onSubmitEditing={handleSend}
        />
        <Image style={styles.rightBtn} source={faceIcon} />
        {text.length === 0 ? (
          <Image style={styles.rightBtn} source={moreIcon} />
        ) : (
          <View style={[styles.sendBtn]}>
            <Text style={styles.sendText} onPress={handleSend}>
              发送
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    height: window.height,
    width: window.width,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  scrollview: {
    marginHorizontal: 0,
    width: window.width,
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  gap: {
    height: 10,
  },
  btmBar: {
    width: window.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderTopColor: '#c0c0c0',
    borderTopWidth: 0.5,
    // height: Math.max(window.width * 0.07 + 15, 45 + window.width * 0.02),
  },
  leftBtn: {
    width: window.width * 0.07,
    height: window.width * 0.07,
    margin: 0,
    marginLeft: window.width * 0.02,
    marginRight: 0,
  },
  rightBtn: {
    width: window.width * 0.07,
    height: window.width * 0.07,
    marginRight: window.width * 0.02,
    marginLeft: 0,
  },
  inputBox: {
    height: 36,
    flex: 1,
    backgroundColor: 'white',
    margin: window.width * 0.02,
    padding: 0,
    paddingLeft: 8,
    borderRadius: 4,
  },
  sendBtn: {
    backgroundColor: 'green',
    width: window.width * 0.12,
    height: window.width * 0.07,
    marginRight: window.width * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  sendText: {
    color: 'white',
  },
});

// 0.07*3+0.6+0.02*5
export default ChatPage;
