import { StatusBar } from 'expo-status-bar';
import Login from '../components/Login';
import { customStyles } from '../utils/CustomStyle';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Register from '../components/Register';

export default function Authentification() {
  return (
    <View style={styles.container}>
      <Login/>
      <Register />
      <Text>Yom</Text>
      <Text>Kata</Text>
      <TouchableOpacity style={styles.login}> <Text> Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login}> <Text> Register</Text>
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
    width: '100%',
    height: "100%",
  },
  login:{
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
  }

});
