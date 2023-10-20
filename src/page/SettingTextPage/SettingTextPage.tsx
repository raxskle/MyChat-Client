import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationProps } from "../../utils/types";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/index";

import { Dimensions } from "react-native";
import { getFriendInfo, updateName } from "../../http";
import { changeUserName } from "../../store/userSlice";

const window = Dimensions.get("window");

let sharedSetText = null;

let sharedNavigation = null;

const useSharedText: (s: string) => [string, any] = (userName: string) => {
  const [text, setText] = useState(userName);
  sharedSetText = setText;
  return [text, setText];
};

export function SettingTextTopBtn(props): JSX.Element {
  const { name: userName, id } = useSelector(
    (state: RootState) => state.user.user
  );

  const [text, setText] = useSharedText(userName);

  const dispatch = useDispatch();
  console.log("text in btn", text);

  return (
    <Text
      style={{
        backgroundColor: text.length === 0 ? "grey" : "green",
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
        color: "white",
        fontSize: 16,
      }}
      onPress={async () => {
        console.log("save name");
        const res = await updateName(text, id).catch((err) => {
          Alert.alert("更改名字失败，请重试");
          return;
        });
        dispatch(changeUserName({ name: res.data }));
        if (sharedNavigation) {
          sharedNavigation.navigate("Home");
        }
      }}
    >
      保存
    </Text>
  );
}

// 设置文字页面
export function SettingTextPage({ navigation }: NavigationProps): JSX.Element {
  const userName = useSelector((state: RootState) => state.user.user.name);
  const [text, setText] = useState(userName);
  console.log("text in Page", text);

  if (!sharedNavigation) {
    sharedNavigation = navigation;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBar}>
        <TextInput
          style={[
            styles.input,
            { borderBottomColor: text.length === 0 ? "red" : "green" },
          ]}
          value={text}
          placeholder="搜索账号"
          onChangeText={(newText) => {
            setText(newText);
            if (sharedSetText) {
              console.log("ss", newText);
              sharedSetText(newText);
            }
          }}
        />
      </View>

      <Text style={styles.tips}>好名字可以让你的朋友更容易记住你。</Text>
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
  textBar: {
    width: window.width * 0.95,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 4,
    paddingLeft: 0,
    fontSize: 18,
    margin: 10,
    borderBottomWidth: 0.8,
  },
  tips: {},
});
