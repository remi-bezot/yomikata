import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Register from "./components/Register";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: vw(100),
    height: vh(100),
  },
  btn: {},
});
