/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Pressable,
} from "react-native";

import { Dimensions } from "react-native";
import ToggleFriendItem from "./ToggleFriendItem/ToggleFriendItem";
import { getCode } from "../../utils/getCode";
import { compare } from "pinyin";
import { createGroup, getFriendInfo } from "../../http";
import { NavigationProps } from "../../utils/types";
import { FriendInfo, setFriends } from "../../store/friendSlice";
import { updateGroup } from "../../store/userSlice";
import { addGroup } from "../../store/groupSlice";

const window = Dimensions.get("window");

function TeamUpGroupPage({ navigation }: NavigationProps): JSX.Element {
  const friendsId = useSelector((state: RootState) => state.user.user.friends);
  const userId = useSelector((state: RootState) => state.user.user.id);
  const friendList = useSelector((state: RootState) => state.friend.data);

  const dispatch = useDispatch();

  useEffect(() => {
    // 排序
    getFriendInfo(friendsId).then((res: FriendInfo[]) => {
      dispatch(
        setFriends({
          friends: [...res].sort((a, b) => compare(a.name, b.name)),
        })
      );
    });
  }, [friendsId, dispatch]);

  const codeList = [
    "↑",
    "☆",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ];

  const [selectList, setSelectList] = useState([]);

  const getSelectStatus = (id: string) => {
    return selectList.includes(id);
  };

  const [showModal, setShowModal] = useState(false);

  const [groupName, setGroupName] = useState("");

  const handleTeamUpGroup = async () => {
    if (groupName.length > 0 && selectList.length > 0) {
      const res = await createGroup(groupName, [userId, ...selectList]);

      // socket会通知群组中所有人包括自己addGroup
      // if (res.data) {
      //   dispatch(
      //     updateGroup({ group: { id: res.data.id, name: res.data.name } })
      //   );
      //   // 新建群组之后需要更新user的groups字段，还需要更新groupSlice数据
      //   dispatch(addGroup({ group: res.data }));
      // }

      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.wrap}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.container}
      >
        <Text style={styles.title}>选择朋友创建发起群聊</Text>

        {friendList.map((item, index) => {
          return (
            <View key={item.id}>
              {(index === 0 ||
                getCode(friendList[index - 1].name).toUpperCase() !==
                  getCode(item.name).toUpperCase()) && (
                <Text style={styles.gap}>
                  {getCode(item.name).toUpperCase()}
                </Text>
              )}
              <ToggleFriendItem
                selected={getSelectStatus(item.id)}
                avator={{ uri: item.avator }}
                name={item.name}
                handlePress={() =>
                  setSelectList((oldList) => {
                    if (getSelectStatus(item.id)) {
                      // 取消
                      return [...oldList.filter((id) => id !== item.id)];
                    } else {
                      // 选中
                      return [...oldList, item.id];
                    }
                  })
                }
              />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.ctrlBar}>
        <Text
          style={[
            styles.ctrlBtn,
            {
              backgroundColor:
                selectList.length > 0 ? "green" : "rgba(0,0,0,0.2)",
            },
          ]}
          onPress={() => {
            setShowModal(true);
          }}
        >{`完成${selectList.length > 0 ? `(${selectList.length})` : ""}`}</Text>
      </View>

      {showModal && (
        <Modal visible={showModal} transparent={true}>
          <Pressable
            onPress={() => {
              setShowModal(false);
            }}
          >
            <View style={styles.mask}>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                }}
              >
                <View style={styles.nameBox}>
                  <TextInput
                    value={groupName}
                    onChangeText={(value) => {
                      setGroupName(value);
                    }}
                    style={styles.nameInput}
                    placeholder="请输入群聊名称"
                  />
                  <Text
                    style={[
                      styles.ctrlBtn,
                      {
                        backgroundColor:
                          groupName.length > 0 ? "green" : "rgba(0,0,0,0.2)",
                      },
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleTeamUpGroup();
                    }}
                  >
                    确认
                  </Text>
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* 这部分单独拆组件无法显示 */}
      <View style={styles.bar}>
        {codeList.map((code) => (
          <Text key={code} style={styles.char}>
            {code}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: "flex",
    flexDirection: "column",
    zIndex: 2,
    elevation: 2,
    flex: 1,
    width: window.width,
    shadowColor: "transparent",
  },
  wrap: {
    width: window.width,
    flex: 1,
    position: "relative",
    zIndex: 2,
    elevation: 2,
  },
  title: {
    marginVertical: 10,
    fontSize: 15,
  },
  gap: {
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 20,
  },
  bar: {
    zIndex: 20,
    elevation: 20,
    position: "absolute",
    right: 0,
    top: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
    width: 30,
    flex: 1,
  },
  char: {
    fontSize: 12,
    color: "#030303",
    // color: 'black',
  },
  btmBar: {
    width: window.width,
    height: 60,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  ctrlBar: {
    height: 50,
    shadowColor: "transparent",
    // backgroundColor: "rgba(250,250,250,0.1)",
    backgroundColor: "rgb(250,250,250)",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  ctrlBtn: {
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginHorizontal: 20,
    fontSize: 16,
    color: "white",
  },
  mask: {
    width: window.width,
    height: window.height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  nameBox: {
    width: 250,
    height: 150,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 6,
  },
  nameInput: {
    fontSize: 16,
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    padding: 4,
    margin: 8,
    width: 200,
  },
});

export default TeamUpGroupPage;
