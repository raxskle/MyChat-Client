import React, {ReactElement, useState} from 'react';

import {StyleSheet, Pressable} from 'react-native';

interface PressableWithStyleProp {
  children: ReactElement;
  onPress?: any;
}

function PressableWithStyle({
  children,
  onPress,
}: PressableWithStyleProp): JSX.Element {
  const [press, setPress] = useState(false);

  return (
    <Pressable
      onPressIn={() => {
        setPress(true);
      }}
      onPressOut={() => {
        setPress(false);
      }}
      onPress={onPress}
      style={press ? styles.itemPressing : styles.itemDefault}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemDefault: {
    backgroundColor: 'white',
  },
  itemPressing: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
});

export default PressableWithStyle;
