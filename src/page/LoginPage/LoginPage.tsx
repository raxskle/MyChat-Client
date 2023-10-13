import React from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';

import {Dimensions} from 'react-native';

function LoginPage({navigation}: {navigation: any}): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.highlight}>Login Page</Text>
      <Button
        title="login"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
  },
  scrollview: {
    marginHorizontal: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'pink',
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default LoginPage;
