import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";

import { Dimensions } from "react-native";
import { NavigationProps } from "../../../utils/types";
import { ChatType } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { formatTime } from "../../../utils/formatTime";
import PressableWithStyle from "../../../components/PressableWithStyle";
const window = Dimensions.get("window");

interface RecordItemProps {
  name: string;
  avator: ImageSourcePropType;
  count: number;
}

function RecordItem({ name, avator, count }: RecordItemProps): JSX.Element {
  return (
    <PressableWithStyle>
      <View style={styles.item}>
        <Image style={styles.avator} source={avator} />

        <View style={styles.main}>
          <View style={styles.data}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.msg} numberOfLines={1}>
              {`共${count}条相关聊天记录`}
            </Text>
          </View>
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
    width: window.width,
    height: 70,
  },

  avator: {
    width: 50,
    height: 50,
    borderRadius: 6,
    margin: 10,
  },
  unchecked: {
    backgroundColor: "red",
    position: "absolute",
    top: 4,
    right: 4,
    height: 16,
    minWidth: 16,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 11,
  },
  main: {
    flex: 1,
    maxWidth: window.width,
    borderBottomWidth: 0.8,
    borderBottomColor: "rgba(0, 0, 0, 0.06)",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
  },
  data: {},
  name: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
    maxWidth: window.width * 0.5,
  },
  msg: {
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.4)",
    maxWidth: window.width * 0.8,
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  time: {
    alignSelf: "flex-start",
    marginRight: 10,
    marginTop: 15,
    color: "rgba(0, 0, 0, 0.4)",
  },
});

export default RecordItem;
