import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';
import MButton from './MButton';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const ANDROID_CLIENT_ID = "430190611129-ri6cfjsakts45imckl2cpa41elof0k1k.apps.googleusercontent.com"
const WEB_CLIENT_ID = "430190611129-8k04fmhi02s20ecbs8a8cqrug200c68k.apps.googleusercontent.com"

const MLogin = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
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
    } catch (error) {
      // Add error handler
    }
  }

  const appendDataToGoogleSheet = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(`accessToken: ${accessToken}`)
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const sheetId = '12P5-URZO0SfO5-ebVALqgCohdaEhcjWeFkDgAzJmNwY';
    const range = 'DATOS!A:A';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`;

    const body = {
      majorDimension: "ROWS",
      values: [
        ["2023-12-12", "Valor desde Android!!!"]
      ]
    };

    let data = {"majorDimension": "ROWS",  "values": [["2023-03-01","Lo logre de ANDROOIDDD"]]};

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sheets.googleapis.com/v4/spreadsheets/12P5-URZO0SfO5-ebVALqgCohdaEhcjWeFkDgAzJmNwY/values/DATOS!A:A:append?valueInputOption=RAW',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + accessToken
      },
      data : JSON.stringify(data)
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
    });

  };


  return (
    <View style={styles.container}>
      <Text style={styles.description}>{JSON.stringify(userInfo, null, 2)}</Text>
      <Text style={styles.title}>Metrics Uploader</Text>
      <MButton type="primary" text="Sign in with Google" onPress={() => promptAsync()} />
      <MButton type="primary" text="Append to google sheets" onPress={appendDataToGoogleSheet} />
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
