import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginCode from './modules/LoginCode';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start  working on your app!</Text>
      <LoginCode/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  
});
