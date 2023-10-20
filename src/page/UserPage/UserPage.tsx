import React, { useState } from "react";

import { StyleSheet, Text, View, Image } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/index";

import { Dimensions } from "react-native";
import PressableWithStyle from "../../components/PressableWithStyle";
const window = Dimensions.get("window");

import * as ImagePicker from "expo-image-picker";
import { uploadAvator } from "../../http";
import { changeUserAvator } from "../../store/userSlice";

function UserPage({
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);

  const logout = () => {
    navigation.navigate("Login");
  };

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.6,
      base64: true,
    });

    if (!result.canceled) {
      // 拿到pick的图片
      console.log(result.assets[0].type);
      const base64URI = "data:image/png;base64," + result.assets[0].base64;

      console.log("发送", { base64: base64URI, id: user.id });
      const newAvator = await uploadAvator({ base64: base64URI, id: user.id });
      console.log("设置头像,", newAvator);
      dispatch(changeUserAvator({ avator: newAvator }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.avator} source={{ uri: user.avator }} />
        <View style={styles.data}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.id}>微信号：{user.id}</Text>
        </View>
      </View>
      <View style={styles.gap} />
      <PressableWithStyle onPress={pickImage}>
        <View style={styles.item}>
          <Text style={styles.text}>头像</Text>
        </View>
      </PressableWithStyle>
      <PressableWithStyle>
        <View style={styles.item}>
          <Text style={styles.text}>名字</Text>
        </View>
      </PressableWithStyle>
      <PressableWithStyle>
        <View style={styles.item}>
          <Text style={styles.text}>微信号</Text>
        </View>
      </PressableWithStyle>
      <View style={styles.gap} />
      <PressableWithStyle onPress={logout}>
        <View style={styles.item}>
          <Text style={styles.text}>切换账号</Text>
        </View>
      </PressableWithStyle>
      <PressableWithStyle onPress={logout}>
        <View style={styles.item}>
          <Text style={styles.text}>退出</Text>
        </View>
      </PressableWithStyle>
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
  },
  user: {
    width: window.width,
    backgroundColor: "white",
    padding: 30,
    paddingTop: 60,
    paddingBottom: 60,
    flexDirection: "row",
  },
  data: {
    flex: 1,
  },
  avator: {
    width: 60,
    height: 60,
    marginRight: 30,
  },
  name: {
    fontSize: 24,
    color: "#131313",
    marginBottom: 8,
  },
  id: {},
  gap: {
    height: 10,
  },
  item: {
    width: window.width,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderTopColor: '#F3F3F3',
    // borderTopWidth: 1,
    borderBottomColor: "#F3F3F3",
    borderBottomWidth: 1,
  },
  text: {
    color: "#030303",
    fontSize: 17,
  },
});

export default UserPage;
