import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const MButton = ({ type, text, onPress, disabled }) => {
  const buttonStyle = [
    styles.button,
    type === 'primary' && styles.primaryButton,
    disabled && styles.buttonDisabled
  ];

  const textStyle = [
    styles.text,
    disabled && styles.textDisabled
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    margin: 12,
    padding: 10,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors['gray-1'],
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDisabled: {
    color: colors['gray-3'],
  }
});

export default MButton;
