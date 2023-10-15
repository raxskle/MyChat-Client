import React from 'react';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

interface FriendItemProps {
  handlePress: () => void;
  avator: string;
  name: string;
}

function FriendItem({avator, name, handlePress}: FriendItemProps): JSX.Element {
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.item}>
        <Image style={styles.avator} source={{uri: avator}} />
        <View style={styles.main}>
          <Text style={styles.name}>{name}</Text>
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
    // backgroundColor: 'transparent',
    width: window.width,
    height: 56,
    zIndex: 2,
    elevation: 2,
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
    margin: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  main: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: {},
  name: {
    fontSize: 17,
    fontWeight: 'normal',
    color: 'black',
  },
});

export default FriendItem;
