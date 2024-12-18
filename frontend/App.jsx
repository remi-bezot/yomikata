import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native"; // Pour utiliser les styles de layout

import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UserScreen from "./screens/UserScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import DialogueScreen from "./screens/DialogueScreen";
import PracticeScreen from "./screens/PracticeScreen";
import SearchScreen from "./screens/SearchScreen";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";



import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct pour React Native

import userReducer from "./reducers/users";
import continuesReducer from "./reducers/continues";

// Configuration de Persist
const persistConfig = {
  key: "Yomikata", // Clé de stockage
  storage: AsyncStorage, // Méthode de stockage pour React Native
  whitelist: ["continues"], // Reducers à persister
};

// Combinaison des reducers
const rootReducer = combineReducers({
  user: userReducer, // Non persisté
  continues: continuesReducer, // Persisté
});

// Application de persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Création du persistor
export const persistor = persistStore(store);


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
	<Tab.Navigator
	screenOptions={{
	  tabBarShowLabel: false, // Désactiver les labels
	  tabBarStyle: {
		backgroundColor: 'rgba(193, 46, 46, 1)', // Couleur semi-transparente
		position: 'absolute', // Position flottante
		borderTopWidth: 0, // Supprime la bordure
		height:70, // Hauteur personnalisée
		marginHorizontal: 15, // Espacement horizontal
		marginBottom: 15, // Espacement en bas
		borderRadius: 15, // Coins arrondis
		shadowColor: '#000', // Ombre
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
		paddingBottom: 0 ,
		elevation: 5, // Ombre pour Android
	  },
	  tabBarActiveTintColor: "#fff", // Couleur active
	  tabBarInactiveTintColor: "#b2b2b2", // Couleur inactive
	  headerShown: false, // Supprimer l'en-tête
	  tabBarLabelStyle :{
		height :0,
	  },
	 
	}}
  >

<Tab.Screen
	  name="dashboard"
	  component={DashboardScreen}
	  options={{
		tabBarIcon: ({ color, size, focused }) => (
		  <FontAwesome6 name="torii-gate" size={focused ? 30 : 20} color={color} />
		),
		tabBarIconStyle: {
		  marginBottom: 0, // Enlever l'espacement sous l'icône
		},
	  }}
	/>

	<Tab.Screen
	  name="favorite"
	  component={FavoriteScreen}
	  options={{
		tabBarIcon: ({ color, size, focused }) => (
		  <FontAwesome6 name="heart" size={focused ? 30 : 20} color={color} />
		),
		tabBarIconStyle: {
		  marginBottom: 0, // Enlever l'espacement sous l'icône
		},
	  }}
	/>
	
	<Tab.Screen
	  name="Search"
	  component={SearchScreen}
	  options={{
		tabBarIcon: ({ color, size, focused }) => (
		  <FontAwesome6 name="magnifying-glass" size={focused ? 30 : 20} color={color} />
		),
		tabBarIconStyle: {
		  marginBottom: 0, // Enlever l'espacement sous l'icône
		},
	  }}
	/>
	<Tab.Screen
	  name="user"
	  component={UserScreen}
	  options={{
		tabBarIcon: ({ color, size, focused }) => (
		  <FontAwesome6 name="user" size={focused ? 30 : 20} color={color} />
		),
		tabBarIconStyle: {
		  marginBottom: 0, // Enlever l'espacement sous l'icône
		},
	  }}
	/>
  </Tab.Navigator>


	);
};

export default function App() {
	return (
		<Provider store={store}>
			 <PersistGate loading={null} persistor={persistor}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="home" component={HomeScreen} />
                    <Stack.Screen name="Auth" component={AuthScreen} />
                    <Stack.Screen name="Dialogue" component={DialogueScreen} />
                    <Stack.Screen name="Exercise" component={PracticeScreen} />

                    <Stack.Screen name="TabNavigator" component={TabNavigator} />
                   
				</Stack.Navigator>
			</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
