import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageSourcePropType,
} from "react-native";
import { NavigationProps } from "../../utils/types";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";

import { Dimensions } from "react-native";
import { getFriendInfo } from "../../http";
import PressableWithStyle from "../../components/PressableWithStyle";
import FriendItem from "../FriendListPage/FriendItem/FriendItem";
import { FriendInfo } from "../../store/friendSlice";
import RecordItem from "./RecordItem/RecordItem";

const window = Dimensions.get("window");

// 搜索friend页面
function SearchPage({ navigation }: NavigationProps): JSX.Element {
  const [searchText, setSearchText] = useState("");

  const [status, setStatus] = useState<"blur" | "texting" | "notFound">("blur");

  const userId = useSelector((state: RootState) => state.user.user.id);

  const searchUser = async () => {
    const friend = await getFriendInfo([searchText]);

    if (friend.length === 0) {
      Alert.alert("用户不存在");
    } else if (friend.length === 1) {
      navigation.navigate("FriendProfile", friend[0]);
    } else {
      Alert.alert("搜索出错，请重试");
    }
  };

  const friendList = useSelector((state: RootState) => state.friend.data);

  // 搜索包含text字符的朋友列表
  const searchFriend = (text: string) => {
    if (!text) {
      return [];
    }
    return friendList.filter((friend) => friend.name.includes(text));
  };

  const toFriendProfilePage = (friendInfo: FriendInfo) => {
    navigation.navigate("FriendProfile", friendInfo);
  };

  const chats = useSelector((state: RootState) => state.user.user.chats);
  const groupChats = useSelector(
    (state: RootState) => state.user.user.groupChats
  );
  const groups = useSelector((state: RootState) => state.user.user.groups);

  // 搜索包含text字符的聊天记录的朋友或者group
  // returns: {avator,name,count}[]
  const searchChat = (
    text: string
  ): { avator: ImageSourcePropType; name: string; count: number }[] => {
    const result = [];

    if (!text) {
      return [];
    }

    for (const key in chats) {
      let recordNums = 0;

      chats[key].forEach((chat) => {
        if (chat.content.includes(text)) {
          recordNums++;
        }
      });

      if (recordNums > 0) {
        // 该聊天对象包含记录
        const target = friendList.find((friend) => friend.id === key);
        result.push({
          avator: { uri: target.avator },
          name: target.name,
          count: recordNums,
        });
      }
    }
    for (const key in groupChats) {
      let recordNums = 0;

      groupChats[key].forEach((chat) => {
        if (chat.content.includes(text)) {
          recordNums++;
        }
      });

      if (recordNums > 0) {
        // 该聊天对象包含记录
        const target = groups.find((group) => group.id === key);
        result.push({
          avator: require("../../assets/WechatActive.png"),
          name: target.name,
          count: recordNums,
        });
      }
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          source={require("../../assets/SearchIcon.png")}
        />
        <TextInput
          style={styles.input}
          value={searchText}
          placeholder="搜索"
          onChangeText={(newText) => {
            setSearchText(newText);
            setStatus("texting");
          }}
        />
      </View>

      {/* 搜索用户 */}
      {status === "texting" && searchText !== "" && (
        <PressableWithStyle onPress={searchUser}>
          <View style={styles.addBox}>
            <Image
              style={styles.addIcon}
              source={require("../../assets/AddFriend.png")}
            />
            <Text style={styles.addText}>搜索账号:{searchText}</Text>
          </View>
        </PressableWithStyle>
      )}

      {/* 搜索朋友 */}
      {status === "texting" && searchFriend(searchText).length > 0 && (
        <View style={styles.friendTitle}>
          <Text>联系人</Text>
        </View>
      )}
      {status === "texting" &&
        searchFriend(searchText).map((friend) => {
          return (
            <FriendItem
              key={friend.id}
              handlePress={() => toFriendProfilePage(friend)}
              avator={{ uri: friend.avator }}
              name={friend.name}
            />
          );
        })}
      {/* 搜索聊天记录 */}
      {status === "texting" && searchChat(searchText).length > 0 && (
        <View style={styles.friendTitle}>
          <Text>聊天记录</Text>
        </View>
      )}
      {status === "texting" &&
        searchChat(searchText).map((record) => {
          return (
            <RecordItem
              key={record.name}
              avator={record.avator}
              name={record.name}
              count={record.count}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    width: window.width,
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  searchBar: {
    width: window.width * 0.95,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
  },
  searchIcon: {
    width: window.width * 0.06,
    height: window.width * 0.06,
    marginRight: window.width * 0.02,
    marginLeft: window.width * 0.02,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    padding: 4,
    paddingLeft: 0,
  },
  addBox: {
    width: window.width,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  addIcon: {
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: "green",
  },
  addText: {},
  notFoundBox: {
    height: 100,
    width: window.width,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  myId: {
    marginTop: 10,
  },
  friendTitle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: window.width,
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 10,
    backgroundColor: "white",
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 0.5,
  },
});

export default SearchPage;
