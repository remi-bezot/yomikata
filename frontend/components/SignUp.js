import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { customStyles } from "../utils/CustomStyle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import { Const } from "../utils/Const";
const uri = Const.uri;
export default function SignUp() {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpname, setSignUpname] = useState("");
  const [signUpemail, setSignUpemail] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const handleConnect = () => {
    fetch(`http://${uri}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: signUpname,
        username: signUpUsername,
        email: signUpemail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpname("");
          setSignUpemail("");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.inputTitle}>Name</Text>
      <TextInput
        onChangeText={(value) => setSignUpname(value)}
        value={signUpname}
        style={styles.inputStyles}
        placeholder="name"
      ></TextInput>
      <Text style={styles.inputTitle}>Username</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignUpUsername(value)}
        value={signUpUsername}
        placeholder="username"
      ></TextInput>
      <Text style={styles.inputTitle}>Email</Text>
      <TextInput
        onChangeText={(value) => setSignUpemail(value)}
        value={signUpemail}
        style={styles.inputStyles}
        placeholder="email"
      ></TextInput>
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignUpPassword(value)}
        value={signUpPassword}
        placeholder="password"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleConnect()}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
});
