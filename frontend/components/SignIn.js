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
import { login, showModal } from "../reducers/users";
import { BackendAdress } from "../utils/BackendAdress";
import { useNavigation } from "@react-navigation/native";
const uri = BackendAdress.uri;




export default function SignUp() {
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigation = useNavigation();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState(false)

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleConnect = () => {
    fetch(`http://${uri}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInEmail, token: data.token }));
          setSignInEmail("");
          setSignInPassword("");

          dispatch(showModal(false))

          navigation.navigate("TabNavigator", { screen: "dashboard" });
        }
        else {
          setFormError(true)
        }

      });
}

    const checkForm = () => {
      if (EMAIL_REGEX.test(signInEmail)) {
        handleConnect()
      } else {
        setEmailError(true);
      }
    };
        

  return (
    <KeyboardAvoidingView style={styles.container}>
      {formError && <Text style={styles.error}>Invalid Form</Text>}
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignInEmail(value)}
        value={signInEmail}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      ></TextInput>

      {emailError && <Text style={styles.error}>Invalid email address</Text>}

      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setSignInPassword(value)}
        value={signInPassword}
        placeholder="password"
        secureTextEntry={true}
        keyboardType="default"
        autoCapitalize="none"
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => checkForm()}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: {
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
