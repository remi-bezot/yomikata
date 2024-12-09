import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { customStyles } from '../utils/CustomStyle'
import {useState} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../reducers/users'


export default function Login({navigation}) {

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInname, setSignInname] = useState('');
  const [signInemail, setSignInemail] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  

  const handleConnect = () => {
    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signInname , username: signInUsername, email: signInemail, password: signInPassword}),
    }).then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data)
                dispatch(login({username: signInUsername, token: data.token }));
                setSignInUsername('');
                setSignInPassword('');
                setSignInname('');
                setSignInemail('');
            }
        });
};

// if (user.token){
//   navigation.navigate('TabNavigator')
// }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.inputTitle}>Email</Text>
      <TextInput 
        //   onChangeText={onChangeNumber}
        //   value={number}
          style={styles.inputStyles}
          placeholder="email">
            </TextInput>
    <Text style={styles.inputTitle}>Password</Text>
    <TextInput style={styles.inputStyles} onChangeText={onChangeNumber}  value={number} placeholder="password">
    </TextInput>
    <TouchableOpacity style={styles.login} onPress={() => handleConnect()}> <Text>SignIn</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
  inputStyles: { 
    height: 40,
    width: customStyles.buttonWidth, 
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }, 
  inputTitle:{
    fontFamily: 'noto sans jp',
    fontSize: 15, 
  }, 
  title: {
    fontSize: 20, 
    fontWeight:'700',
    fontFamily: customStyles.defaultFontFamily, 
  }, 
  login:{
    
  }



})