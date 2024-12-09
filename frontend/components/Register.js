import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";

export default function Register() {
  return (
    <KeyboardAvoidingView>
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
  },
  text: {
    fontFamily: customStyles.defaultFontFamily,
  },
});
