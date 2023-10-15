import React from 'react';

import {StyleSheet, Text, View, Image, Pressable} from 'react-native';

import {useSelector} from 'react-redux';
import type {RootState} from '../../store/index';

import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

function UserPage({navigation}: {route: any; navigation: any}): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);

  const logout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.avator}
          source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
        />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.id}>微信号：{user.id}</Text>
        </View>
      </View>

      <View style={styles.gap} />

      <View style={styles.item}>
        <Text style={styles.text}>头像</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>名字</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>微信号</Text>
      </View>

      <View style={styles.gap} />

      <Pressable onPress={logout}>
        <View style={styles.item}>
          <Text style={styles.text}>切换账号</Text>
        </View>
      </Pressable>
      <Pressable onPress={logout}>
        <View style={styles.item}>
          <Text style={styles.text}>退出</Text>
        </View>
      </Pressable>
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
  },
  user: {
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
  gap: {
    height: 10,
  },
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
});

export default UserPage;
