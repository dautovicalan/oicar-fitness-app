import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
} from "react-native-paper";
import { InitialView } from "./views/InitialView";
import LoginView from "./views/LoginView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./navigation/AuthStack";
import { RegistrationProcessContextProvider } from "./context/RegistrationProcessContext";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <RegistrationProcessContextProvider>
      <NavigationContainer>
        <PaperProvider>
          <AuthStack />
        </PaperProvider>
      </NavigationContainer>
    </RegistrationProcessContextProvider>
  );
}
