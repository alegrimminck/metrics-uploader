import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../constants/colors";
import MButton from "./MButton";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../logic/authentication/authContext";

WebBrowser.maybeCompleteAuthSession();

const MLogin = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metrics Uploader</Text>
      <MButton
        type="primary"
        text="Sign in with Google"
        onPress={() => signIn()}
      />
      <MButton
        type="primary"
        text="Delete local storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "normal",
    color: colors.primary,
    marginBottom: 40,
    marginTop: 40,
  },
  description: {
    fontSize: 15,
    fontWeight: "normal",
    color: "black",
    marginBottom: 40,
    marginTop: 40,
  },
});

export default MLogin;
