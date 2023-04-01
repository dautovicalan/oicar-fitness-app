import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { InitialView } from "../views/InitialView";
import LoginView from "../views/LoginView";
import NavigationBottomBar from "./NavigationBottomBar";
import RegistrationProcessStack from "./RegistrationProcessStack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={InitialView} />
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegistrationProcessStack} />
      <Stack.Screen name="MainApp" component={NavigationBottomBar} />
    </Stack.Navigator>
  );
}
