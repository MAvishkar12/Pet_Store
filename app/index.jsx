import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./Screen/HomeScreen";
import FormScreen from "./Screen/FormScreen";
import CardScreen from "./Screen/CardScreen"
import { View, StyleSheet } from "react-native";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Sell") {
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
            } else if (route.name === "Card") {
              iconName = focused ? "card" : "card-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#c1121f",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sell" component={FormScreen} />
        <Tab.Screen name="Card" component={CardScreen} />
      </Tab.Navigator>
    </View>
  );
}

