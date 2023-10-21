/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";

import { Dimensions } from "react-native";
import { getFriendInfo, getGroupInfo, getUserInfo } from "../../http";
import { setUser } from "../../store/userSlice";
import { setFriends } from "../../store/friendSlice";
import { compare } from "pinyin";
import { setGroups } from "../../store/groupSlice";

const window = Dimensions.get("window");

function LoginPage({ navigation }: { navigation: any }): JSX.Element {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const btnActive = id !== "" && password !== "";

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
      style={styles.container}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>登录中...</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.top}>
        <Image style={styles.image} source={require("../../assets/Icon.png")} />
        <View style={styles.item}>
          <Text style={styles.title}>账号</Text>
          <TextInput
            style={styles.input}
            placeholder="请填写用户名"
            maxLength={16}
            onChangeText={(newId) => setId(newId)}
            defaultValue={id}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>密码</Text>
          <TextInput
            style={styles.input}
            placeholder="请填写密码"
            maxLength={16}
            // keyboardType="visible-password"
            secureTextEntry={true}
            editable={true}
            onChangeText={(newPassword) => setPassword(newPassword)}
            defaultValue={password}
          />
        </View>
      </View>

      <Text
        onPress={async () => {
          if (id !== "" && password !== "") {
            setModalVisible(true);
            const user = await getUserInfo(id, password);
            if (!user) {
              Alert.alert("登陆失败");
              return;
            }
            dispatch(setUser({ user }));

            const friendInfoList = await getFriendInfo(user.friends);
            dispatch(
              setFriends({
                friends: [...friendInfoList].sort((a, b) =>
                  compare(a.name, b.name)
                ),
              })
            );

            const groupInfoList = await getGroupInfo(
              user.groups.map((group) => group.id)
            );
            console.log("get群组信息", groupInfoList);
            if (groupInfoList.data) {
              dispatch(
                setGroups({
                  groups: groupInfoList.data,
                })
              );
            }

            // 跳转进入
            setModalVisible(false);
            navigation.navigate("Home");
          }
        }}
        style={[styles.btn, btnActive ? styles.btnActive : styles.btnDisabled]}
      >
        注册/登录
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: "flex",

    flex: 1,
    paddingTop: 60,
  },
  top: {
    alignItems: "center",
  },
  image: {
    marginBottom: 20,
  },
  item: {
    width: window.width,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 0.8,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    height: 60,
  },
  title: {
    padding: 0,
    fontSize: 17,
    marginLeft: 20,
    marginRight: 60,
    color: "#030303",
  },
  input: {
    padding: 0,
    marginRight: 20,
    fontSize: 17,
    overflow: "hidden",
    flex: 1,
  },
  btn: {
    fontSize: 17,
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 40,
    marginBottom: 100,
  },
  btnDisabled: {
    backgroundColor: "#e3e3e3",
    color: "grey",
  },
  btnActive: {
    backgroundColor: "#1AAD19",
    color: "white",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
  },
  modalView: {
    width: window.width * 0.5,
    height: window.width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 10,
  },
  modalText: {
    color: "black",
    fontSize: 16,
  },
});

export default LoginPage;
