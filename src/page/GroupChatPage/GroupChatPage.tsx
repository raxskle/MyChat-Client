/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  Pressable,
  Modal,
} from "react-native";

import { Dimensions } from "react-native";

import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProps } from "../../utils/types";

import { CheckMsgType, checkAllMsg, sendGroupMsg, sendMsg } from "../../socket";

const window = Dimensions.get("window");

const voiceIcon = require("../../assets/ChatPage/voice2.png");
const faceIcon = require("../../assets/ChatPage/smile.png");
const moreIcon = require("../../assets/ChatPage/more.png");

import * as ImagePicker from "expo-image-picker";
import PressableWithStyle from "../../components/PressableWithStyle";

import GroupChatContent from "./GroupChatContent/GroupChatContent";
import ImageViewer from "react-native-image-zoom-viewer";
import { getFriendInfo, getGroupInfo } from "../../http";
import { FriendInfo } from "../../store/friendSlice";
import { checkMsgLocal } from "../../store/userSlice";
interface RouteParams {
  groupId: string;
}

function GroupChatPage({ route, navigation }: NavigationProps): JSX.Element {
  const { groupId }: RouteParams = route.params;

  // 群组的信息
  const groupInfo = useSelector((state: RootState) =>
    state.group.data.find((item) => item.id === groupId)
  );

  // 群组成员信息数组 {id,name,avator}[]
  const [memberInfo, setMembers] = useState<FriendInfo[]>([]);

  // 自己的信息
  const user = useSelector((state: RootState) => state.user.user);

  // 群聊
  const groupChats = useSelector(
    (state: RootState) => state.user.user.groupChats[groupId]
  );

  if (user.id === "" || !groupChats || !groupInfo) {
    navigation.navigate("Login");
  }

  const dispatch = useDispatch();

  // 输入的信息
  const [text, setText] = useState("");

  useEffect(() => {
    // 设置标题
    navigation.setOptions({
      title: groupInfo?.name || "群聊",
    });

    // 获取 群组成员具体信息
    console.log(groupInfo.member);
    getFriendInfo(groupInfo.member).then((res) => {
      setMembers(res);
    });
  }, [groupInfo, navigation]);

  // 发送
  const handleSend = () => {
    if (text.length > 0) {
      // 发送
      sendGroupMsg({
        groupId: groupId,
        speaker: user.id,
        content: text,
        type: "text",
      });
      setText("");
      console.log("scrollToEnd ");
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }
  };

  // 滚动到底部
  const scrollViewRef = useRef<ScrollView>(null);
  // 初始进入时滚动
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);
  // 有新消息时滚动
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [user]);

  // 打开相册
  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.4,
      base64: true,
    });

    if (!result.canceled) {
      // 拿到pick的图片
      // console.log(result.assets[0].type);
      const base64URI = "data:image/png;base64," + result.assets[0].base64;

      sendGroupMsg({
        groupId: groupId,
        speaker: user.id,
        content: base64URI,
        type: "image",
      });
      console.log("scrollToEnd ");
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }
  };

  // 显示more 相册按钮等
  const [showMore, setShowMore] = useState(false);

  const inputRef = useRef(null);

  const images = groupChats
    .filter((item) => item.type === "image")
    .map((item) => {
      return {
        url: item.content,
      };
    });

  const [zoom, setZoom] = useState(false);

  const [clickIndex, setIndex] = useState(0);

  const ZoomImage = useCallback((url) => {
    const index = images.findIndex((item) => item.url === url);
    setIndex(index);
    setZoom(true);
  }, []);

  useEffect(() => {
    // here 打开页面才会执行
    // 已读所有信息

    const data: CheckMsgType = {
      type: "groupChats",
      userId: user.id,
      targetId: groupId,
    };

    checkAllMsg(data);
    dispatch(checkMsgLocal({ data: data }));
  }, [user.id, groupId]);

  return (
    <View style={styles.container}>
      <GroupChatContent
        ZoomImage={ZoomImage}
        groupId={groupId}
        memberInfo={memberInfo}
        ref={scrollViewRef}
      />

      <Modal visible={zoom} transparent={true}>
        <ImageViewer
          onClick={() => {
            setZoom(false);
          }}
          imageUrls={images}
          index={clickIndex}
          pageAnimateTime={200}
        />
      </Modal>

      <View style={styles.btmBar}>
        <Image style={styles.leftBtn} source={voiceIcon} />
        <TextInput
          ref={inputRef}
          style={styles.inputBox}
          placeholder=""
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
          onFocus={() => {
            setShowMore(false);
            console.log("scrollToEnd ");
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
          onSubmitEditing={handleSend}
        />
        <Pressable>
          <Image style={styles.rightBtn} source={faceIcon} />
        </Pressable>
        {text.length === 0 ? (
          <Pressable
            onPress={() => {
              inputRef.current.blur();
              console.log("scrollToEnd ");
              scrollViewRef.current?.scrollToEnd({ animated: true });
              setTimeout(() => {
                setShowMore((more) => !more);
              }, 50);
            }}
          >
            <Image style={styles.rightBtn} source={moreIcon} />
          </Pressable>
        ) : (
          <View style={[styles.sendBtn]}>
            <Text style={styles.sendText} onPress={handleSend}>
              发送
            </Text>
          </View>
        )}
      </View>

      {showMore && (
        <View style={styles.moreBox}>
          <View style={styles.moreItemWrap}>
            <PressableWithStyle onPress={openImageLibrary}>
              <Image
                style={styles.images}
                source={require("../../assets/ImageGallery.png")}
              />
            </PressableWithStyle>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    height: window.height,
    width: window.width,
    marginHorizontal: 0,
    marginVertical: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  scrollview: {
    marginHorizontal: 0,
    width: window.width,
    flex: 1,
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
  btmBar: {
    width: window.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    borderTopColor: "#c0c0c0",
    borderTopWidth: 0.5,
    // height: Math.max(window.width * 0.07 + 15, 45 + window.width * 0.02),
  },
  leftBtn: {
    width: window.width * 0.07,
    height: window.width * 0.07,
    margin: 0,
    marginLeft: window.width * 0.02,
    marginRight: 0,
  },
  rightBtn: {
    width: window.width * 0.07,
    height: window.width * 0.07,
    marginRight: window.width * 0.02,
    marginLeft: 0,
  },
  inputBox: {
    height: 38,
    flex: 1,
    backgroundColor: "white",
    margin: window.width * 0.02,
    padding: 0,
    paddingLeft: 8,
    borderRadius: 4,
  },
  sendBtn: {
    backgroundColor: "green",
    width: window.width * 0.12,
    height: window.width * 0.07,
    marginRight: window.width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  sendText: {
    color: "white",
  },
  moreBox: {
    height: window.height * 0.352,
    width: window.width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  images: {
    width: 40,
    height: 40,
    margin: 14,
    backgroundColor: "transparent",
  },
  moreItemWrap: {
    borderRadius: 14,
    overflow: "hidden",
    margin: 40,
    backgroundColor: "transparent",
  },
});

export default GroupChatPage;
