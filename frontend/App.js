import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { customStyles } from './utils/CustomStyle';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Yomikata</Text>
      <Text style={styles.h2}>registration</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btntext}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbar}>
        <Text style={styles.btntext}>navbar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navcircle}>
        <Text style={styles.btntext}>navbar</Text>
      </TouchableOpacity>
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
  btn: {
    display: 'flex', 
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor: "#EEC1C0",
    width: '80%', 
    height: 50, 
    borderRadius: customStyles.borderRadius, 
  }, 
  btntext: {
    fontSize: 20, 
  }, 
  h1: {
    fontSize: 32, 
    color: '#CC4646',
    fontFamily: 'satoshi',
  }, 
  h2: {
    fontSize: 24, 
    color: 'black',
    fontFamily: 'noto sans jp',
  }, 
  navbar: {
    width: '90%', 
    height: 50, 
    borderRadius: 24, 
    backgroundColor: "#EEC1C0",
  }, 
  navcircle: {
    height: '7%', 
    borderRadius: 100, 
    backgroundColor: "black",
  }, 

  
  
});
