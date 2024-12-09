import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";

export default function Register() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.inputTitle}>Email</Text>
      <TextInput
        //   onChangeText={onChangeNumber}
        //   value={number}
        style={styles.inputStyles}
        placeholder="email"
      ></TextInput>
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput
        //   onChangeText={onChangeNumber}
        //   value={number}
        style={styles.inputStyles}
        placeholder="password"
        secureTextEntry={true}
      ></TextInput>
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
  },
  text: {
    fontFamily: customStyles.defaultFontFamily,
  },
  inputStyles: {
    height: 40,
    width: customStyles.buttonWidth,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputTitle: {
    fontFamily: "noto sans jp",
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: customStyles.defaultFontFamily,
  },
});
