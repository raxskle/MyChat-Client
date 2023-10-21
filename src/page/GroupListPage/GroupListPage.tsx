/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Dimensions } from "react-native";

import { NavigationProps } from "../../utils/types";

import PressableWithStyle from "../../components/PressableWithStyle";

const window = Dimensions.get("window");

function GroupPage({ navigation }: NavigationProps): JSX.Element {
  const user = useSelector((state: RootState) => state.user.user);

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
        {user.groups?.map((item) => {
          return (
            <View key={item.id}>
              <PressableWithStyle>
                <View style={styles.item}>
                  <Image
                    style={[styles.icon]}
                    source={require("../../assets/WechatActive.png")}
                  />
                  <View style={styles.main}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </PressableWithStyle>
            </View>
          );
        })}
        <View style={styles.btmBar}>
          <Text>{user.groups.length}个群聊</Text>
        </View>
      </ScrollView>
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
  },
  wrap: {
    width: window.width,
    flex: 1,
    position: "relative",
    zIndex: 2,
    elevation: 2,
  },

  btmBar: {
    width: window.width,
    height: 60,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0,
    // backgroundColor: 'transparent',
    width: window.width,
    height: 56,
    zIndex: 2,
    elevation: 2,
    shadowColor: "transparent",
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 6,

    margin: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  main: {
    flex: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: "rgba(0, 0, 0, 0.06)",
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
    flex: 1,
    marginRight: 40,
  },
});

export default GroupPage;
