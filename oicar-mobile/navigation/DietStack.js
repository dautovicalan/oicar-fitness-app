import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DietView from "../views/main-views/DietView";
import SearchFood from "../views/diet-views/SearchFood";
import AddFood from "../views/diet-views/AddFood";

const Stack = createNativeStackNavigator();

export default function DietStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diet Dashboard" component={DietView} />
      <Stack.Screen name="Search Food" component={SearchFood} />
      <Stack.Screen name="Add Food" component={AddFood} />
    </Stack.Navigator>
  );
}
