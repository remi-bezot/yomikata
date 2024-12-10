import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { customStyles } from "../utils/CustomStyle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    // dispatch(updateNickname(nickname));
    // navigation.navigate("TabNavigator");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.inputTitle}>Email</Text>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.inputStyles}
        placeholder="email"
      ></TextInput>
      <Text style={styles.inputTitle}>Password</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="password"
      ></TextInput>
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
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
});
