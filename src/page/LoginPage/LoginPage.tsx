/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {Dimensions} from 'react-native';
import {getUserInfo} from '../../http';
import {setUser} from '../../store/userSlice';

const window = Dimensions.get('window');

function LoginPage({navigation}: {navigation: any}): JSX.Element {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const btnActive = id !== '' && password !== '';

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.image} source={require('../../assets/Icon.png')} />
        <View style={styles.item}>
          <Text style={styles.title}>账号</Text>
          <TextInput
            style={styles.input}
            placeholder="请填写用户名"
            onChangeText={newId => setId(newId)}
            defaultValue={id}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>密码</Text>
          <TextInput
            style={styles.input}
            placeholder="请填写密码"
            // keyboardType="visible-password"
            secureTextEntry={true}
            editable={true}
            onChangeText={newPassword => setPassword(newPassword)}
            defaultValue={password}
          />
        </View>
      </View>

      <Text
        style={[styles.btn, btnActive ? styles.btnActive : styles.btnDisabled]}
        onPress={async () => {
          if (id !== '' && password !== '') {
            const user = await getUserInfo(id, password);
            if (user) {
              dispatch(setUser({user}));
              console.log('登录, user:', user);
              navigation.navigate('Home');
            }
          }
        }}>
        注册/登录
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    // height: 200,
    marginHorizontal: 0,
    marginVertical: 0,
    display: 'flex',

    flex: 1,
    paddingTop: 60,
  },
  top: {
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
  },
  item: {
    width: window.width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    height: 60,
  },
  title: {
    padding: 0,
    fontSize: 17,
    marginLeft: 20,
    marginRight: 60,
    color: '#030303',
  },
  input: {
    padding: 0,
    fontSize: 17,
  },
  btn: {
    fontSize: 17,
    height: 40,
    lineHeight: 40,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 40,
    marginBottom: 100,
  },
  btnDisabled: {
    backgroundColor: '#e3e3e3',
    color: 'grey',
  },
  btnActive: {
    backgroundColor: '#1AAD19',
    color: 'white',
  },
});

export default LoginPage;
