import React from "react";
import { KeyboardAvoidingView, View, Text, StyleSheet } from "react-native";
import Lessons from "../components/Lessons";

export default function Dialogue(route) {
	// console.log(route.route.params.lessonId);
	let lessonId = route.route.params.lessonId;
	let lessonIndex = route.route.params.lessonIndex;
	
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.header}>
				<Text style={styles.title}>Dialogue Screen</Text>
			</View>
			<View style={styles.content}>
				<Lessons lessonId={lessonId} lessonIndex={lessonIndex}/>
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
		padding: 40,
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
