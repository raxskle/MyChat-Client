import React, {useEffect, useRef, useState} from 'react';

import {ScrollView, StyleSheet, TextInput, View, Image} from 'react-native';

import {Dimensions} from 'react-native';
import GreenChat from './GreenChat/GreenChat';
import WhiteChat from './WhiteChat/WhiteChat';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import {NavigationProps} from '../../utils/types';

const window = Dimensions.get('window');

const voiceIcon = require('../../assets/ChatPage/voice2.png');
const faceIcon = require('../../assets/ChatPage/smile.png');
const moreIcon = require('../../assets/ChatPage/more.png');

function ChatPage({navigation}: NavigationProps): JSX.Element {
  const [text, setText] = useState('');

  const user = useSelector((state: RootState) => state.user.user);
  if (user.id === '') {
    navigation.navigate('Login');
  }

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: false});

    console.log('user: ', user);
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollview]}>
        <GreenChat />
        <WhiteChat />
        <GreenChat />
        <WhiteChat />
        <GreenChat />
        <WhiteChat />
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
        />
        <Image style={styles.rightBtn} source={faceIcon} />
        <Image style={styles.rightBtn} source={moreIcon} />
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
    justifyContent: 'center',
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
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    borderTopColor: '#c0c0c0',
    borderTopWidth: 0.5,
  },
  leftBtn: {
    width: window.width * 0.07,
    height: window.width * 0.07,
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
    width: window.width * 0.6,
    backgroundColor: 'white',
    margin: window.width * 0.02,
    padding: 0,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

// 0.07*3+0.6+0.02*5
export default ChatPage;
