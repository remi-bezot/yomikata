import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import user from "../reducers/user";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: { user },
});

const reducers = combineReducers({ user });

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</Provider>
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
