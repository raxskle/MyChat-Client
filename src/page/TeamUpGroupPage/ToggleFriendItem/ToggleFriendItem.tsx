import React, { useState } from "react";

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Dimensions } from "react-native";
import PressableWithStyle from "../../../components/PressableWithStyle";
const window = Dimensions.get("window");

interface FriendItemProps {
  handlePress: () => void;
  avator: ImageSourcePropType;
  name: string;
  selected: boolean;
}

function ToggleFriendItem({
  avator,
  name,
  selected,
  handlePress,
}: FriendItemProps): JSX.Element {
  return (
    <PressableWithStyle onPress={handlePress}>
      <View style={styles.item}>
        {selected ? (
          <Image
            style={styles.toggleActive}
            source={require("../../../assets/Checkmark.png")}
          />
        ) : (
          <View style={styles.toggle}></View>
        )}

        <Image style={styles.avator} source={avator} />
        <View style={styles.main}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </PressableWithStyle>
  );
}

const styles = StyleSheet.create({
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
  toggle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 2,
    marginLeft: 20,
  },
  toggleActive: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "green",
    backgroundColor: "green",
    borderWidth: 2,
    marginLeft: 20,
  },
  avator: {
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

export default ToggleFriendItem;
