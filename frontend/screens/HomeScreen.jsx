<<<<<<< HEAD
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
=======
import { KeyboardAvoidingView , Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
>>>>>>> 9f1644e059ddfe92bee41a5bc07e6a23adab8d65

export default function HomeScreen({ navigation }) {
	const handlesubmit = () => {
		navigation.navigate("TabNavigator");
	};

<<<<<<< HEAD
	return (
		<View style={styles.container}>
			<Text onPress={() => handlesubmit()}>HomeScreen</Text>
			<Login />
			<Register />
		</View>
	);
=======

  const handlesubmit = () => {
    navigation.navigate('Authentification')
  }
 
  return (
    <KeyboardAvoidingView  style={styles.container}>
      <Text onPress={() => handlesubmit()} >HomeScreen</Text>
    </KeyboardAvoidingView>
  )
>>>>>>> 9f1644e059ddfe92bee41a5bc07e6a23adab8d65
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(	255, 190, 11, 0.4)",
	},
	image: {
		width: "100%",
		height: "50%",
	},
	title: {
		fontSize: 40,
		fontWeight: "600",
		fontFamily: "Futura",
		marginBottom: 20,
	},
	inputContainer: {
		width: "85%",
		backgroundColor: "#ffffff",
		padding: 30,
		borderRadius: 1,
	},
	input: {
		width: "100%",
		borderBottomColor: "#000000",
		borderBottomWidth: 1,
		fontSize: 16,
	},
	button: {
		alignItems: "center",
		paddingTop: 8,
		width: "100%",
		marginTop: 30,
		backgroundColor: "#fbe29c",
		borderRadius: 1,
	},
	textButton: {
		fontFamily: "Futura",
		height: 30,
		fontWeight: "600",
		fontSize: 16,
	},
	error: {
		marginTop: 10,
		color: "red",
	},
});
