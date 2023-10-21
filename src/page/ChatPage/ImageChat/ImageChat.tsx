import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, Image } from "react-native";

import { Dimensions } from "react-native";
import { ChatType } from "../../../store/userSlice";
const window = Dimensions.get("window");

import { Modal, Pressable } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface ImageChatProps {
  chat: ChatType;
  avator: string;
  isUser: boolean;
  onPress: any;
  name?: string;
}

interface ImageSize {
  width: number;
  height: number;
}

const resize = (size: ImageSize) => {
  if (!size) {
    return {};
  }
  const maxWidth = window.width * 0.4;
  const maxHeight = window.width * 0.5;

  let finalWidth: number;
  let finalHeight: number;
  let scale: number;

  if (size.width >= size.height) {
    finalWidth = maxWidth;
    scale = finalWidth / size.width;
    finalHeight = scale * size.height;
  } else {
    finalHeight = maxHeight;
    scale = finalHeight / size.height;
    finalWidth = scale * size.width;
  }

  return { width: finalWidth, height: finalHeight };
};

function ImageChat({
  chat,
  avator,
  isUser,
  onPress,
  name,
}: ImageChatProps): JSX.Element {
  const [size, setSize] = useState<ImageSize>();

  useEffect(() => {
    Image.getSize(chat.content, (width, height) => {
      setSize({ width, height });
    });
  }, []);

  return (
    <View style={[styles.chat, isUser ? styles.UserChat : styles.FriendChat]}>
      <View style={styles.content}>
        {name && <Text style={styles.name}>{name}</Text>}
        <View style={styles.bubble}>
          <Pressable onPress={onPress}>
            <Image
              style={[styles.image, resize(size)]}
              source={{ uri: chat.content }}
            />
          </Pressable>
        </View>
      </View>

      <Image style={styles.avator} source={{ uri: avator }} />
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: window.width,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  FriendChat: {
    flexDirection: "row-reverse",
  },
  UserChat: {
    flexDirection: "row",
  },
  bubble: {
    overflow: "hidden",
    borderRadius: 6,
  },
  image: {
    maxWidth: window.width * 0.4,
    maxHeight: window.width * 0.5,
    width: "auto",
    height: "auto",
  },
  avator: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "green",
    margin: 12,
    marginBottom: 0,
  },
  content: {
    flexDirection: "column",
    marginTop: 12,
  },
  name: {
    padding: 0,
    fontSize: 14,
    color: "rgba(0,0,0,0.3)",
  },
});

export default ImageChat;
