import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Practice from "../components/Practice";

const PracticeScreen = (route) => {	
	let lessonId = route.route.params.lessonId;
	let practiceIndex = route.route.params.practiceIndex;
	return (
		<View>
			<Text style={styles.title}>Practice</Text>
			<Text><Practice lessonId={lessonId} lessonIndex={practiceIndex}/></Text>
		</View>
	);
};
const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "700",
		top: 80,
		textAlign: "center",
	},
});

export default PracticeScreen;
