import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationProps} from '../../utils/types';

import {useSelector} from 'react-redux';
import type {RootState} from '../../store/index';

import {Dimensions} from 'react-native';
import {getFriendInfo} from '../../http';
import PressableWithStyle from '../../components/PressableWithStyle';

const window = Dimensions.get('window');

// 搜索friend页面
function AddFriendPage({navigation}: NavigationProps): JSX.Element {
  const [searchText, setSearchText] = useState('');

  const [status, setStatus] = useState<'blur' | 'texting' | 'notFound'>('blur');

  const userId = useSelector((state: RootState) => state.user.user.id);

  const search = async () => {
    const friend = await getFriendInfo([searchText]);
    console.log(friend);
    if (friend.length === 0) {
      setStatus('notFound');
    } else if (friend.length === 1) {
      navigation.navigate('FriendProfile', friend[0]);
    } else {
      Alert.alert('搜索出错，请重试');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          source={require('../../assets/SearchIcon.png')}
        />
        <TextInput
          style={styles.input}
          value={searchText}
          placeholder="搜索账号"
          onChangeText={newText => {
            setSearchText(newText);
            setStatus('texting');
          }}
        />
      </View>

      {status === 'texting' && searchText !== '' && (
        <PressableWithStyle onPress={search}>
          <View style={styles.addBox}>
            <Image
              style={styles.addIcon}
              source={require('../../assets/AddFriend.png')}
            />
            <Text style={styles.addText}>搜索:{searchText}</Text>
          </View>
        </PressableWithStyle>
      )}

      {status === 'notFound' && (
        <View style={styles.notFoundBox}>
          <Text>该用户不存在</Text>
        </View>
      )}

      <Text style={styles.myId}>我的微信号：{userId}</Text>
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
    marginTop: 50,
  },
  searchBar: {
    width: window.width * 0.95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
  },
  searchIcon: {
    width: window.width * 0.06,
    height: window.width * 0.06,
    marginRight: window.width * 0.02,
    marginLeft: window.width * 0.02,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    padding: 4,
    paddingLeft: 0,
  },
  addBox: {
    width: window.width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  addIcon: {
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: 'green',
  },
  addText: {},
  notFoundBox: {
    height: 100,
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myId: {
    marginTop: 10,
  },
});

export default AddFriendPage;
