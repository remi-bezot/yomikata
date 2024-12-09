import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Login from './components/Login';

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
      <Text>Open up App.js to start  working on your app!</Text>
      <Login/>
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
    height: "100%",
  },
  btn: {},
});
