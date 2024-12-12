import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import Authentification from "./screens/Authentification";
import DashboardScreen from "./screens/DashboardScreen";
import SignUp from "./components/SignUp";
import FavoriteScreen from "./screens/FavoriteScreen";
import UserScreen from "./screens/UserScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import user from "./reducers/users";
import LessonsScreen from "./screens/LessonsScreen";

import { Provider } from "react-redux";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import PracticeScreen from "./screens/PracticeScreen";

const store = configureStore({
	reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = "";

					if (route.name === "dashboard") {
						iconName = "torii-gate";
					} else if (route.name === "Lessons") {
						iconName = "book";
					} else if (route.name === "favorite") {
						iconName = "heart";
					} else if (route.name === "user") {
						iconName = "user";
					}

					return <FontAwesome6 name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "#e8be4b",
				tabBarInactiveTintColor: "#b2b2b2",
				headerShown: false,
			})}
		>
			<Tab.Screen name="dashboard" component={DashboardScreen} />
			<Tab.Screen name="Lessons" component={LessonsScreen} />
			<Tab.Screen name="Practice" component={PracticeScreen} />
			<Tab.Screen name="favorite" component={FavoriteScreen} />
			<Tab.Screen name="user" component={UserScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="home" component={HomeScreen} />
					<Stack.Screen name="Auth" component={Authentification} />
					<Stack.Screen name="TabNavigator" component={TabNavigator} />
					<Stack.Screen name="SignUp" component={SignUp} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
