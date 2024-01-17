import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';
import MButton from './MButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { postGoogleSheets } from '../logic/requests/postGoogleSheets';

WebBrowser.maybeCompleteAuthSession();

const ANDROID_CLIENT_ID = "430190611129-ri6cfjsakts45imckl2cpa41elof0k1k.apps.googleusercontent.com"

const MLogin = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response])

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await AsyncStorage.setItem('accessToken', response.authentication.accessToken);
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json()
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      navigateToMainPage();
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToMainPage = () => {
    navigation.navigate('MMainPage');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metrics Uploader</Text>
      <MButton type="primary" text="Sign in with Google" onPress={() => promptAsync()} />
      <MButton type="primary" text="Append to google sheets" onPress={postGoogleSheets} />
      <MButton type="primary" text="Delete local storage" onPress={() => AsyncStorage.removeItem("@user")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    color: colors.primary,
    marginBottom: 40,
    marginTop: 40,
  },
  description: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
    marginBottom: 40,
    marginTop: 40,
  }
});

export default MLogin;
