import React from "react";
import { StyleSheet, TextInput } from "react-native";

const MTextInput = ({ onChangeText, placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    color: "black",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 8,
  },
});

export default MTextInput;
