import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';

import {Dimensions} from 'react-native';
import {ChatType} from '../../../store/userSlice';
const window = Dimensions.get('window');

// const sample = 'Y😄';

interface WhiteChatProps {
  chat: ChatType;
  avator: string;
}

function WhiteChat({chat}: WhiteChatProps): JSX.Element {
  return (
    <View style={styles.chat}>
      <Image
        style={styles.avator}
        source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
      />

      <View style={styles.bubble}>
        <Text style={styles.text}>{chat.content}</Text>
        <View style={styles.triangle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    marginTop: 10,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    maxWidth: window.width * 0.7,
  },
  triangle: {
    position: 'absolute',
    left: -12,
    top: 14,
    width: 6,
    height: 6,
    borderWidth: 6,
    borderRightWidth: 6,
    borderRightColor: 'white',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    color: '#161616',
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
    margin: 10,
    marginBottom: 0,
  },
});

export default WhiteChat;
