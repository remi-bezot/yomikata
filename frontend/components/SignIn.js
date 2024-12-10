import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";

export default function SignUp() {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleConnect = () => {
    fetch("http://10.10.200.23:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>SignIn</Text>

      <Text style={styles.inputTitle}>Username</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignInUsername(value)}
        value={signInUsername}
        placeholder="username"
      ></TextInput>

      <Text style={styles.inputTitle}>Password</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignInPassword(value)}
        value={signInPassword}
        placeholder="password"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleConnect()}>
        {" "}
        <Text>SignIn</Text>
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