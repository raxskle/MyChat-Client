/* eslint-disable react-native/no-inline-styles */
import React from "react";

import { ScrollView, StyleSheet } from "react-native";

import { Dimensions } from "react-native";
import ChatItem from "./ChatItem/ChatItem";
import { NavigationProps } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const window = Dimensions.get("window");

function ChatListPage({ navigation }: NavigationProps): JSX.Element {
  const chats = useSelector((state: RootState) => state.user.user.chats) || {};

  const user = useSelector((state: RootState) => state.user.user);

  const friendList = useSelector((state: RootState) => state.friend.data);

  const groupChats =
    useSelector((state: RootState) => state.user.user.groupChats) || {};

  const groups = useSelector((state: RootState) => state.user.user.groups);

  const sortedChatList = () => {
    const chatList = Object.keys(chats)
      .filter((id) => {
        // 即使在chats字段中存在该用户，还需要数据库中存在该用户的信息，才会显示
        return friendList.find((friend) => friend.id === id);
      })
      .map((id) => {
        const info = friendList.find((item) => item.id === id);

        const uncheckedCount = chats[id].filter(
          (chat) => chat.checked === false && chat.userid !== user.id
        ).length;

        return {
          time: chats[id][chats[id].length - 1]?.time || "0",
          element: (
            <ChatItem
              key={id}
              navigation={navigation}
              chat={chats[id]}
              friendId={id}
              name={info.name}
              avator={{ uri: info.avator }}
              uncheckedNum={uncheckedCount}
            />
          ),
        };
      });

    const groupChatList = Object.keys(groupChats).map((id) => {
      const info = groups.find((item) => item.id === id);
      const uncheckedCount = groupChats[id].filter(
        (chat) => chat.checked === false && chat.userid !== user.id
      ).length;
      return {
        time: groupChats[id][groupChats[id].length - 1]?.time || "0",
        element: (
          <ChatItem
            key={id}
            navigation={navigation}
            chat={groupChats[id]}
            groupId={info.id}
            name={info.name}
            avator={require("../../assets/Icon.png")}
            uncheckedNum={uncheckedCount}
          />
        ),
      };
    });

    return [...chatList, ...groupChatList]
      .sort((a, b) => Number(b.time) - Number(a.time))
      .map((item) => item.element);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      style={styles.container}
    >
      {/* {Object.keys(chats)
        .filter((id) => {
          // 即使在chats字段中存在该用户，还需要数据库中存在该用户的信息，才会显示
          return friendList.find((friend) => friend.id === id);
        })
        .map((id) => {
          const info = friendList.find((item) => item.id === id);
          return (
            <ChatItem
              key={id}
              navigation={navigation}
              chat={chats[id]}
              friendId={id}
              name={info.name}
              avator={{ uri: info.avator }}
            />
          );
        })}

      {groupChats &&
        Object.keys(groupChats).map((id) => {
          const info = groups.find((item) => item.id === id);
          return (
            <ChatItem
              key={id}
              navigation={navigation}
              chat={groupChats[id]}
              groupId={info.id}
              name={info.name}
              avator={require("../../assets/Icon.png")}
            />
          );
        })} */}

      {sortedChatList()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "white",
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: "flex",
    flexDirection: "column",
    width: window.width,
    flex: 1,
  },
  highlight: {
    fontWeight: "700",
    backgroundColor: "white",
    // borderColor: 'black',
    // borderWidth: 1,
  },
});

export default ChatListPage;
