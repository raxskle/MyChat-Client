/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState, forwardRef, memo } from "react";

import { ScrollView, StyleSheet, View, Text, Modal } from "react-native";

import { Dimensions } from "react-native";
import GreenChat from "../GreenChat/GreenChat";
import WhiteChat from "../WhiteChat/WhiteChat";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { NavigationProps } from "../../../utils/types";
import ImageViewer from "react-native-image-zoom-viewer";
import { formatTime } from "../../../utils/formatTime";

const window = Dimensions.get("window");

import { ChatType } from "../../../store/userSlice";
import ImageChat from "../ImageChat/ImageChat";

interface ContentParams {
  friendId: string;
  ZoomImage: any;
}

// scrollView 组件 在每次组件重新渲染时都会闪烁，使用memo+useCallback缓存，仅在user数据改变时重新渲染
const Content = forwardRef<ScrollView, ContentParams>(
  ({ friendId, ZoomImage }, ref) => {
    // 对方的信息
    const friendInfo = useSelector((state: RootState) => {
      return state.friend.data.find((item) => item.id === friendId);
    });
    // 自己的信息
    const user = useSelector((state: RootState) => state.user.user);

    const chat = user.chats?.[friendId] || [];

    const settle = (item: ChatType) => {
      if (item.userid === user.id) {
        // 自己的消息
        if (item.type == "text") {
          return (
            <GreenChat
              chat={item}
              avator={user.avator}
              loading={item.loading}
            />
          );
        } else {
          return (
            <ImageChat
              onPress={() => ZoomImage(item.content)}
              chat={item}
              avator={user.avator}
              isUser={true}
              loading={item.loading}
            />
          );
        }
      } else {
        if (item.type == "text") {
          return <WhiteChat chat={item} avator={friendInfo.avator} />;
        } else {
          return (
            <ImageChat
              onPress={() => ZoomImage(item.content)}
              chat={item}
              avator={friendInfo.avator}
              isUser={false}
            />
          );
        }
      }
    };

    return (
      <>
        <ScrollView
          ref={ref}
          onScroll={(e) => {}}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={[styles.scrollview]}
        >
          <Text
            style={styles.helloText}
          >{`你已添加了${friendInfo?.name}，现在可以开始聊天了！`}</Text>
          {/*  chatList */}
          {chat.map((item, index) => {
            return (
              <View style={styles.singleChatItem} key={Math.random()}>
                {index === 0 ||
                  (Number(item.time) - Number(chat[index - 1].time) >
                    1000 * 60 * 10 && (
                    <Text style={styles.chatTime}>
                      {formatTime(item.time, "full")}
                    </Text>
                  ))}
                {settle(item)}
              </View>
            );
          })}

          <View style={styles.gap} />
        </ScrollView>
      </>
    );
  }
);

const styles = StyleSheet.create({
  scrollview: {
    // marginHorizontal: 0,
    width: window.width,
    backgroundColor: "#f1f1f1",
  },
  helloText: {
    marginVertical: 20,
    color: "rgba(0, 0, 0, 0.4)",
  },
  singleChatItem: {
    width: window.width,
    alignItems: "center",
    justifyContent: "center",
  },
  gap: {
    height: 10,
  },
  chatTime: {
    marginTop: 20,
    marginBottom: 10,
    color: "rgba(0, 0, 0, 0.4)",
  },
});

// 0.07*3+0.6+0.02*5
export default memo(Content);
