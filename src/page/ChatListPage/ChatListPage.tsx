/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {ScrollView, StyleSheet} from 'react-native';

import {Dimensions} from 'react-native';
import ChatItem from './ChatItem/ChatItem';
import {NavigationProps} from '../../utils/types';
const window = Dimensions.get('window');

function ChatListPage({navigation}: NavigationProps): JSX.Element {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={styles.container}>
      <ChatItem navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'column',
    width: window.width,
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
    backgroundColor: 'white',
    // borderColor: 'black',
    // borderWidth: 1,
  },
});

export default ChatListPage;
