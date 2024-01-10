import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const MButton = ({ type, text, onPress, disabled }) => {
  const buttonStyle = [
    styles.baseButton,
    type === 'primary' && styles.primaryButton,
    type === 'secondary' && styles.secondaryButton,
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

MButton.defaultProps = {
  type: 'primary',
  disabled: false,
};

const styles = StyleSheet.create({
  baseButton: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    width: 50
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
