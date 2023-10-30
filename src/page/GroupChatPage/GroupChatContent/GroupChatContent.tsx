/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState, forwardRef, memo } from "react";

import { ScrollView, StyleSheet, View, Text, Modal } from "react-native";

import { Dimensions } from "react-native";

import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { NavigationProps } from "../../../utils/types";
import ImageViewer from "react-native-image-zoom-viewer";
import { formatTime } from "../../../utils/formatTime";

const window = Dimensions.get("window");

import { ChatType } from "../../../store/userSlice";

import { FriendInfo } from "../../../store/friendSlice";
import GreenChat from "../../ChatPage/GreenChat/GreenChat";
import ImageChat from "../../ChatPage/ImageChat/ImageChat";
import WhiteChat from "../../ChatPage/WhiteChat/WhiteChat";

interface ContentParams {
  groupId: string;
  memberInfo: FriendInfo[];
  ZoomImage: any;
}

// scrollView 组件 在每次组件重新渲染时都会闪烁，使用memo+useCallback缓存，仅在user数据改变时重新渲染
const GroupChatContent = forwardRef<ScrollView, ContentParams>(
  ({ groupId, memberInfo, ZoomImage }, ref) => {
    // 群组的信息
    const groupInfo = useSelector((state: RootState) =>
      state.group.data.find((item) => item.id === groupId)
    );

    // 自己的信息
    const user = useSelector((state: RootState) => state.user.user);

    // 群聊
    const groupChats =
      useSelector((state: RootState) => state.user.user.groupChats[groupId]) ||
      [];

    const settle = (item: ChatType) => {
      if (item.userid === user.id) {
        // 自己的消息
        if (item.type == "text") {
          return <GreenChat chat={item} avator={user.avator} />;
        } else {
          return (
            <ImageChat
              onPress={() => ZoomImage(item.content)}
              chat={item}
              avator={user.avator}
              isUser={true}
            />
          );
        }
      } else {
        // 其它member 的消息
        let friendInfo = memberInfo.find((member) => member.id === item.userid);

        friendInfo = friendInfo || {
          avator: user.avator,
          name: " ",
          id: item.userid,
        };

        if (item.type == "text") {
          return (
            <WhiteChat
              chat={item}
              avator={friendInfo.avator}
              name={friendInfo.name}
            />
          );
        } else {
          return (
            <ImageChat
              onPress={() => ZoomImage(item.content)}
              chat={item}
              avator={friendInfo.avator}
              name={friendInfo.name}
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
          maintainVisibleContentPosition={{
            minIndexForVisible: 1,
            autoscrollToTopThreshold: 1,
          }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={[styles.scrollview]}
        >
          <Text
            style={styles.helloText}
          >{`你已加入了群聊 ${groupInfo?.name}，现在可以开始聊天了！`}</Text>
          {groupChats.map((item, index) => {
            return (
              <View style={styles.singleChatItem} key={Math.random()}>
                {index === 0 ? (
                  <Text style={styles.chatTime}>
                    {formatTime(item.time, "full")}
                  </Text>
                ) : (
                  index > 0 &&
                  Number(item.time) - Number(groupChats[index - 1].time) >
                    1000 * 60 * 10 && (
                    <Text style={styles.chatTime}>
                      {formatTime(item.time, "full")}
                    </Text>
                  )
                )}

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
    marginHorizontal: 0,
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
export default memo(GroupChatContent);
