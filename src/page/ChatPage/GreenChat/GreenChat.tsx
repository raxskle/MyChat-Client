import React from "react";

import { View, StyleSheet, Text, Image } from "react-native";

import { Dimensions } from "react-native";
import { ChatType } from "../../../store/userSlice";
const window = Dimensions.get("window");

// const sample = `You see the world is out there
// waiting for me
// That's why I wanna be
// as free as can be!

// I know that you've been good
// and You've been sweet,
// so don't put up a fight,
// Just let it be!

//  well, I hope one day,
// While I'm missing you.
// And so will you
// be Thinking of me!

// Then we can be together,
// To laugh about the past,
// but the love is Still there
// for you and me`;

interface GreenChatProps {
  chat: ChatType;
  avator: string;
}

function GreenChat({ chat }: GreenChatProps): JSX.Element {
  return (
    <View style={styles.chat}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{chat.content}</Text>
        <View style={styles.triangle} />
      </View>

      <Image
        style={styles.avator}
        source={{ uri: "https://demo.raxskle.fun/mie.png" }}
      />
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
    fontSize: 16,
    lineHeight: 20,
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
});

export default GreenChat;
