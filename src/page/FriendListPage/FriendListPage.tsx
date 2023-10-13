import React from 'react';

import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';

import {Dimensions} from 'react-native';

function FriendPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const window = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Text style={styles.highlight}>ChatList Page</Text>
      <Button
        title="logout"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
        title="add"
        onPress={() => {
          navigation.setOptions({
            title: '微信(' + route.params.num + ')',
          });
          // console.log(route.params.num);
          navigation.setParams({num: route.params.num + 1});
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollview]}>
        <Text style={styles.highlight}>{window.width}</Text>
        <Text style={styles.highlight}>{window.height}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
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

export default FriendPage;
