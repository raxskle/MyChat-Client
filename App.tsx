import React from 'react';

// redux
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './src/store/index';

import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

import {Dimensions} from 'react-native';

// 容器
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
//
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginPage from './src/page/LoginPage/LoginPage';
import ChatListPage from './src/page/ChatListPage/ChatListPage';

import FriendPage from './src/page/FriendListPage/FriendListPage';
import SharePage from './src/page/SharePage/SharePage';
import UserPage from './src/page/UserPage/UserPage';
import ChatPage from './src/page/ChatPage/ChatPage';
import FriendProfilePage from './src/page/FriendProfilePage/FriendProfilePage';
import AddFriendPage from './src/page/AddFriendPage/AddFriendPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const WechatIcon = require('./src/assets/Wechat.png');
const WechatActiveIcon = require('./src/assets/WechatActive.png');
const UserListIcon = require('./src/assets/UserList.png');
const UserListActiveIcon = require('./src/assets/UserListActive.png');
const DiscoverIcon = require('./src/assets/Discover.png');
const DiscoverActiveIcon = require('./src/assets/DiscoverActive.png');
const UserIcon = require('./src/assets/User.png');
const UserActiveIcon = require('./src/assets/UserActive.png');

const HeaderButton = () => {
  return (
    <View style={styles.headerRight}>
      <Pressable onPress={() => console.log('This is a button!')}>
        <Image
          style={styles.headerBtn}
          source={require('./src/assets/SearchIcon.png')}
        />
      </Pressable>
      <Pressable onPress={() => console.log('This is a button!')}>
        <Image
          style={styles.headerBtn}
          source={require('./src/assets/AddIcon.png')}
        />
      </Pressable>
    </View>
  );
};

const HeaderBland = () => {
  return <View />;
};

const renderTabBarIcon: any = (route: RouteProp<ParamListBase, string>) => {
  return ({focused}: {focused: boolean}) => {
    if (route.name === '微信') {
      return focused ? (
        <Image style={styles.tabIcon} source={WechatActiveIcon} />
      ) : (
        <Image style={styles.tabIcon} source={WechatIcon} />
      );
    } else if (route.name === '通讯录') {
      return focused ? (
        <Image style={styles.tabIcon} source={UserListActiveIcon} />
      ) : (
        <Image style={styles.tabIcon} source={UserListIcon} />
      );
    } else if (route.name === '发现') {
      return focused ? (
        <Image style={styles.tabIcon} source={DiscoverActiveIcon} />
      ) : (
        <Image style={styles.tabIcon} source={DiscoverIcon} />
      );
    } else {
      return focused ? (
        <Image style={styles.tabIcon} source={UserActiveIcon} />
      ) : (
        <Image style={styles.tabIcon} source={UserIcon} />
      );
    }
  };
};

const Home = ({navigation}: {navigation: any}) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (user.id === '') {
    navigation.navigate('Login');
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: renderTabBarIcon(route),
          headerStyle: {
            backgroundColor: '#f3f3f3',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 18,
          },
          headerRight: HeaderButton,
          headerLeft: HeaderBland,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        };
      }}>
      <Tab.Screen name="微信" component={ChatListPage} />
      <Tab.Screen name="通讯录" component={FriendPage} />
      <Tab.Screen name="发现" component={SharePage} />
      <Tab.Screen
        name="我"
        component={UserPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  console.log('app lanuch');

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.page}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#f3f3f3'} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: '#f3f3f3'},
              headerTitleAlign: 'center',
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'normal',
              },
              headerRight: HeaderButton,
              headerLeft: HeaderBland,
            }}>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{title: '使用账号登陆', headerRight: undefined}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: '微信',
                headerShown: false,
              }}
              initialParams={{num: 0}}
            />
            <Stack.Screen
              name="Chat"
              component={ChatPage}
              options={{
                title: 'Chat',
                headerRight: undefined,
                headerLeft: undefined,
              }}
            />

            <Stack.Screen
              name="FriendProfile"
              component={FriendProfilePage}
              options={{
                title: '',
                headerRight: undefined,
                headerLeft: undefined,
                headerStyle: {backgroundColor: 'white'},
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name="AddFriend"
              component={AddFriendPage}
              options={{
                title: '添加朋友',
                headerRight: undefined,
                headerLeft: undefined,
                headerTransparent: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    height: 26,
    width: 26,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerBtn: {
    height: 24,
    width: 24,
    marginLeft: 4,
    marginRight: 10,
  },
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
