import React from "react";

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
  avatorColor?: string;
}

function FriendItem({
  avator,
  name,
  handlePress,
  avatorColor,
}: FriendItemProps): JSX.Element {
  return (
    <PressableWithStyle onPress={handlePress}>
      <View style={styles.item}>
        <Image
          style={[styles.avator, { backgroundColor: avatorColor || "green" }]}
          source={avator}
        />
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

export default FriendItem;
