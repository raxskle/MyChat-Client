import React, { useState } from "react";

import { View, StyleSheet, Text, Image } from "react-native";

import { Dimensions } from "react-native";
import { ChatType } from "../../../store/userSlice";
const window = Dimensions.get("window");

interface GreenChatProps {
  chat: ChatType;
  avator: string;
  loading?: boolean;
}

function GreenChat({ chat, avator, loading }: GreenChatProps): JSX.Element {
  const [delayLoading, setDelayLoading] = useState(false);
  // 当loading发送超过500ms，则显示loading图标
  if (loading) {
    setTimeout(() => {
      setDelayLoading(true);
    }, 500);
  }

  return (
    <View style={styles.chat}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{chat.content}</Text>
        <View style={styles.triangle} />
        {delayLoading && (
          <Image
            source={require("../../../assets/Loading.png")}
            style={styles.circle}
          />
        )}
      </View>

      <Image style={styles.avator} source={{ uri: avator }} />
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: window.width,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bubble: {
    marginTop: 12,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "rgb(149, 235, 108)",
    borderRadius: 6,
    maxWidth: window.width * 0.7,
  },
  triangle: {
    position: "absolute",
    right: -12,
    top: 14,
    width: 6,
    height: 6,
    borderWidth: 6,
    borderLeftWidth: 6,
    borderLeftColor: "rgb(149, 235, 108)",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  text: {
    fontSize: 17,
    color: "#161616",
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "green",
    margin: 12,
    marginBottom: 0,
  },
  circle: {
    position: "absolute",
    left: -25,
    top: 10,
    width: 20,
    height: 20,
  },
});

export default GreenChat;
