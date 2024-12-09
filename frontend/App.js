import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import user from "../reducers/user";
//imports pour le store

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//configuration du store

const store = configureStore({
	reducer: { user },
});

const reducers = combineReducers({ user });

export default function App() {
	return (
		// inscription du Store pour redux
		<Provider store={store}>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</Provider>
		// inscription du Store pour redux
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
