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
      <TextInput></TextInput>
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
});
