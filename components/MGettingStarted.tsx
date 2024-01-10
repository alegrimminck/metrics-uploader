import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MTextInput from './MTextInput';
import colors from '../constants/colors';
import MButton from './MButton';

const GettingStarted = ({onSave}) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsButtonDisabled(text.length === 0);
  };

  const handleButtonPress = () => {
    onSave(inputValue)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metrics Uploader</Text>
      <Text style={styles.subtitle}>Getting started</Text>
      <Text style={styles.description}>To start you must add the google sheet url of your metrics.</Text>
      <MTextInput onChangeText={handleInputChange} placeholder="Google sheet url"/>
      <MButton type="primary" text="Save" onPress={handleButtonPress} disabled={isButtonDisabled}/>
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
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});

export default GettingStarted;
