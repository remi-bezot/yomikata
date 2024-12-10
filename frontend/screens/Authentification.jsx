import { StatusBar } from "expo-status-bar";
import { customStyles } from "../utils/CustomStyle";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useFonts } from "expo-font";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
	Pressable,
	Image,
} from "react-native";

export default function Authentification() {
	const [signUpModalVisible, setSignUpModalVisible] = useState(false);
	const [signInModalVisible, setSignInModalVisible] = useState(false);

	const [fontsLoaded] = useFonts({
		OverusedGrotesk: require("../assets/fonts/Satoshi-Black.otf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	const showSignUpModal = () => {
		setSignUpModalVisible(true);
	};

	const showSignInModal = () => {
		setSignInModalVisible(true);
	};

	const handleCancelSignUp = () => {
		setSignUpModalVisible(false);
	};

	const handleCancelSignIn = () => {
		setSignInModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<Text style={styles.title_text}>YO</Text>
				<FontAwesome5 name="torii-gate" size={60} color="black" />
				<Text style={styles.title_text}>IKATA</Text>
			</View>
			<Image
				source={require("../assets/FondJap.jpg")}
				style={styles.photoItem}
			/>
			<Modal
				animationType="fade"
				transparent={true}
				visible={signUpModalVisible}
				onRequestClose={handleCancelSignUp}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContentSignup}>
						<SignUp />
						<Pressable style={styles.closeButton} onPress={handleCancelSignUp}>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={signInModalVisible}
				onRequestClose={handleCancelSignIn}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContentSignin}>
						<SignIn />
						<Pressable style={styles.closeButton} onPress={handleCancelSignIn}>
							<Text style={styles.closeButtonText}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<TouchableOpacity onPress={showSignInModal} style={styles.login}>
				<Text>Signin</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={showSignUpModal} style={styles.login}>
				<Text>Signup</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(228,224,207,1)",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	login: {
		backgroundColor: customStyles.buttonBackgroundColor,
		borderRadius: customStyles.buttonRadius,
		width: customStyles.buttonWidth,
		height: customStyles.buttonHeight,
		display: customStyles.buttonDisplay,
		flexDirection: customStyles.buttonFlexDirection,
		alignItems: customStyles.buttonAlignItems,
		justifyContent: customStyles.buttonJustifyContent,
		margin: 10,
		top: 120,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		justifyContent: "center",
		alignItems: "center",
		height: "80",
		flexDirection: "row",
		bottom: 80,
	},
	title_text: {
		fontSize: "70",
		fontFamily: "Satoshi-Black",
	},
	photoItem: {
		width: "90%",
		height: "30%",
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: "#2196F3",
		padding: 10,
		borderRadius: 5,
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
	deleteIcon: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",
	},
	modalContentSignin: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
		width: "80%",
		height: "35%",
	},
	modalContentSignup: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
		width: "80%",
		height: "55%",
	},
});
