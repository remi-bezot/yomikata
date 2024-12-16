import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Practice } from "../components/Practice";

const PracticeScreen = () => {
	return (
		<View>
			<Text style={styles.title}>Practice</Text>
			<Text><Practice/></Text>
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
