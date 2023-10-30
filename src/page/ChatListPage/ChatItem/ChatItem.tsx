import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";

import { Dimensions } from "react-native";
import { NavigationProps } from "../../../utils/types";
import { ChatType } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { formatTime } from "../../../utils/formatTime";
import PressableWithStyle from "../../../components/PressableWithStyle";
const window = Dimensions.get("window");

interface ChatItemProps extends NavigationProps {
  chat: ChatType[];
  friendId?: string;
  name: string;
  avator: ImageSourcePropType;
  groupId?: string;
  uncheckedNum: number;
}

function ChatItem({
  navigation,
  friendId,
  groupId,
  chat,
  name,
  avator,
  uncheckedNum,
}: ChatItemProps): JSX.Element {
  const lastMsg = chat.length > 0 ? chat[chat.length - 1] : undefined;

  const renderLastMsg = (lastMsg: ChatType) => {
    if (!lastMsg) {
      return friendId
        ? `你已添加了 ${name}，现在可以开始聊天了!`
        : `你已加入了群聊 ${name}，现在可以开始聊天了!`;
    }

    if (lastMsg.type === "text") {
      return lastMsg.content.replaceAll("\n", "  ");
    } else if (lastMsg.type === "image") {
      return "[图片]";
    }
  };

  return (
    <PressableWithStyle
      onPress={() => {
        if (friendId) {
          // 私聊
          navigation.navigate("Chat", { friendId });
        } else if (groupId) {
          navigation.navigate("GroupChat", { groupId });
        }
      }}
    >
      <View style={styles.item}>
        <View>
          <Image style={styles.avator} source={avator} />
          {uncheckedNum > 0 && (
            <Text style={styles.unchecked}> {uncheckedNum} </Text>
          )}
        </View>

        <View style={styles.main}>
          <View style={styles.data}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.msg} numberOfLines={1}>
              {renderLastMsg(lastMsg)}
            </Text>
          </View>
          <Text style={styles.time} numberOfLines={1}>
            {lastMsg ? formatTime(lastMsg?.time) : ""}
          </Text>
        </View>
      </View>
    </PressableWithStyle>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: window.width,
    height: 70,
  },

  avator: {
    width: 50,
    height: 50,
    borderRadius: 6,
    margin: 10,
  },
  unchecked: {
    backgroundColor: "red",
    position: "absolute",
    top: 4,
    right: 4,
    height: 16,
    minWidth: 16,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 11,
  },
  main: {
    flex: 1,
    maxWidth: window.width,
    borderBottomWidth: 0.8,
    borderBottomColor: "rgba(0, 0, 0, 0.06)",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  data: {},
  name: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
    maxWidth: window.width * 0.5,
  },
  msg: {
    fontSize: 15,
    color: "rgb(170,170,170)",
    maxWidth: window.width * 0.8,
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  time: {
    alignSelf: "flex-start",
    marginRight: 10,
    marginTop: 15,
    color: "rgb(170,170,170)",
  },
});

export default ChatItem;
