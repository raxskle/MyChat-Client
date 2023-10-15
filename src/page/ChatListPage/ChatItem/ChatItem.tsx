import React from 'react';

import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

function ChatItem({navigation}: {navigation: any}): JSX.Element {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chat');
      }}>
      <View style={styles.item}>
        <Image
          style={styles.avator}
          source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
        />
        <View style={styles.main}>
          <View style={styles.data}>
            <Text style={styles.name}>另一个用户</Text>
            <Text style={styles.msg}>hello!</Text>
          </View>
          <Text style={styles.time}>02:18</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: window.width,
    height: 70,
  },
  avator: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: 'green',
    margin: 10,
  },
  main: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: {},
  name: {
    fontSize: 17,
    fontWeight: 'normal',
    color: 'black',
  },
  msg: {
    fontSize: 15,
    color: 'grey',
  },
  time: {
    alignSelf: 'flex-start',
    marginRight: 10,
    marginTop: 15,
  },
});

export default ChatItem;
