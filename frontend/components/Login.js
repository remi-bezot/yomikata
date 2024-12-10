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
	// États pour l'email et le mot de passe
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Fonction de soumission du formulaire
	const handleLogin = () => {
		// Ici tu pourras gérer la logique de connexion
		console.log("Email:", email);
		console.log("Password:", password);
		// Ajoute ici la redirection ou la logique de connexion
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LOGIN</Text>

			<Text style={styles.inputTitle}>Email</Text>
			<TextInput
				style={styles.inputStyles}
				placeholder="email"
				value={email}
				onChangeText={setEmail}
			/>

			<Text style={styles.inputTitle}>Password</Text>
			<TextInput
				style={styles.inputStyles}
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry // Masquer le mot de passe
			/>

			<TouchableOpacity style={styles.login} onPress={handleLogin}>
				<Text>Login</Text>
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
	login: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#fbe29c",
		borderRadius: 5,
	},
});
