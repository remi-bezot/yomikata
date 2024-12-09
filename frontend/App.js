import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start  working on your app!</Text>
      <Authentification/>
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
    width: '100%',
    height: "100%",
  },

});
