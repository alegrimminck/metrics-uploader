import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/colors';
import MButton from './MButton';

const MLogin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metrics Uploader</Text>
      <MButton type="primary" text="Login" onPress={() => "a"} />
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
});

export default MLogin;
