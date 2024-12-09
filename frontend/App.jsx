import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import DashboardScreen from "./screens/DashboardScreen";
import BookScreen from "./screens/BookScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import UserScreen from "./screens/UserScreen";

import _FontAwesome from "react-native-vector-icons/FontAwesome";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'dashboard') {
          iconName = 'house';
        } else if (route.name === 'book') {
          iconName = 'book';
        } else if(route.name === 'favorite'){
          iconName= 'heart'
        } else if (route.name === 'user'){
          iconName = 'user'
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#e8be4b',
      tabBarInactiveTintColor: '#b2b2b2',
      headerShown: false,
    })}>
      <Tab.Screen name="dashboard" component={DashboardScreen} />
      <Tab.Screen name="book" component={BookScreen} />
      <Tab.Screen name="favorite" component={FavoriteScreen} />
      <Tab.Screen name="user" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
  
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
 
  );
}

