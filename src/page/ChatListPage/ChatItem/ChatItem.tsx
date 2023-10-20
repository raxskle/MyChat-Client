import React from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';

import {Dimensions} from 'react-native';
import {NavigationProps} from '../../../utils/types';
import {ChatType} from '../../../store/userSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {formatTime} from '../../../utils/formatTime';
import PressableWithStyle from '../../../components/PressableWithStyle';
const window = Dimensions.get('window');

interface ChatItemProps extends NavigationProps {
  chat: ChatType[];
  friendId: string;
}

function ChatItem({navigation, friendId, chat}: ChatItemProps): JSX.Element {
  const AllFriends = useSelector((state: RootState) => state.friend.data);
  const info = AllFriends.find(item => item.id === friendId);

  const lastMsg = chat.length > 0 ? chat[chat.length - 1] : undefined;

  return (
    <PressableWithStyle
      onPress={() => {
        navigation.navigate('Chat', {friendId});
      }}>
      <View style={styles.item}>
        <Image
          style={styles.avator}
          source={{uri: 'https://blog.raxskle.fun/images/mie.png'}}
        />

        <View style={styles.main}>
          <View style={styles.data}>
            <Text style={styles.name} numberOfLines={1}>
              {info?.name}
            </Text>
            <Text style={styles.msg} numberOfLines={1}>
              {lastMsg
                ? lastMsg.content.replaceAll('\n', '  ')
                : `你已添加了${info?.name}，现在可以开始聊天了!`}
            </Text>
          </View>
          <Text style={styles.time} numberOfLines={1}>
            {lastMsg ? formatTime(lastMsg?.time) : ''}
          </Text>
        </View>
      </View>
    </PressableWithStyle>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    maxWidth: window.width,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
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
    maxWidth: window.width * 0.5,
  },
  msg: {
    fontSize: 15,
    color: 'grey',
    maxWidth: window.width * 0.8,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  time: {
    alignSelf: 'flex-start',
    marginRight: 10,
    marginTop: 15,
  },
});

export default ChatItem;
