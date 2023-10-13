import React from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Dimensions} from 'react-native';

import io from 'socket.io-client';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const socket = io('https://demo.raxskle.fun', {});

  socket.on('new guy', msg => {
    console.log(msg);
  });

  console.log('app lanuch');

  return (
    <SafeAreaView style={[backgroundStyle, styles.page]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.highlight}>aaa</Text>
        <Button
          title="click"
          onPress={() => {
            console.log('press');
            socket.emit('join', 'react native');
            // fetch('https://blog.raxskle.fun/api/tags', {
            fetch('https://demo.raxskle.fun/aaa', {
              method: 'GET',
            })
              .then(res => {
                return res.json();
              })
              .then(json => {
                console.log(json);
              })
              .catch(err => {
                console.log('fail', err);
              });
          }}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.scrollview]}>
          <Text style={styles.highlight}>{Dimensions.get('window').width}</Text>
          <Text style={styles.highlight}>
            {Dimensions.get('window').height}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
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

export default App;
