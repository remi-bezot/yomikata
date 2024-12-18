import React from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet } from "react-native";
import Dialogue from "../components/Dialogue";

export default function DialogueScreen(props) {
	const id = props.route.params.lessonId;
	const index = props.route.params.themeIndex;

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.header}>
				<Text style={styles.title}>Dialogue Screen</Text>
			</View>
			<View style={styles.content}>
				<Dialogue id={id} index={index} />
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	header: {
		padding: 30,
		backgroundColor: "#EEC1C0",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		color: "#fff",
		fontWeight: "bold",
		top: 10,
	},
	content: {
		flex: 1,
		padding: 10,
	},
});
