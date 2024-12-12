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
import { BackendAdress } from "../utils/BackendAdress";
const uri = BackendAdress.uri;
export default function SignUp() {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const uri = Const.uri;
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpname, setSignUpname] = useState("");
  const [signUpemail, setSignUpemail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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
          setSignUpConfirmPassword("");
          setSignUpname("");
          setSignUpemail("");
        }
        if (data.error) {
          setErrorMessage(true);
        }
      });

    if (EMAIL_REGEX.test(signUpemail)) {
      // navigation.navigate('TabNavigator', { screen: 'dashboard' });
    } else {
      setEmailError(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        onChangeText={(value) => setSignUpname(value)}
        value={signUpname}
        style={styles.inputStyles}
        placeholder="name"
      ></TextInput>

      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignUpUsername(value)}
        value={signUpUsername}
        placeholder="username"
      ></TextInput>

      <TextInput
        onChangeText={(value) => setSignUpemail(value)}
        value={signUpemail}
        style={styles.inputStyles}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      ></TextInput>

      {emailError && <Text style={styles.error}>Invalid email address</Text>}
      {errorMessage && <Text style={styles.error}>Email already exists</Text>}

      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignUpPassword(value)}
        value={signUpPassword}
        placeholder="password"
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
      ></TextInput>

      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignUpConfirmPassword(value)}
        value={signUpConfirmPassword}
        placeholder="confirm password"
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleConnect()}>
        <Text>Sign up</Text>
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
  error: {
    color: "red",
  },
});
