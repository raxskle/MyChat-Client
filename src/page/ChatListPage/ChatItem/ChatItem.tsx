import React from 'react';

import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

import {Dimensions} from 'react-native';
import {NavigationProps} from '../../../utils/types';
import {ChatType} from '../../../store/userSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
const window = Dimensions.get('window');

interface ChatItemProps extends NavigationProps {
  chat: ChatType[];
  friendId: string;
}

function ChatItem({navigation, friendId, chat}: ChatItemProps): JSX.Element {
  const AllFriends = useSelector((state: RootState) => state.friend.data);
  const info = AllFriends.find(item => item.id === friendId);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Chat', {friendId, chat});
      }}>
      <View style={styles.item}>
        <Image
          style={styles.avator}
          source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
        />
        <View style={styles.main}>
          <View style={styles.data}>
            <Text style={styles.name}>{info?.name}</Text>
            <Text style={styles.msg}>
              {chat.length > 0
                ? chat[chat.length - 1].content
                : `你已添加了${info?.name},现在可以开始聊天了!`}
            </Text>
          </View>
          <Text style={styles.time}>
            {chat.length > 0 ? chat[chat.length - 1].content : ''}
          </Text>
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
