import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileView from "../views/main-views/ProfileView";

const Stack = createNativeStackNavigator();

export default function UserIcon({ navigation }) {
  return (
    <Stack.Navigator
      options={{
        header: ({ navigation }) => (
          <Appbar.Header>
            <Appbar.Content title="Home" />
            <Appbar.Action
              icon="account-circle"
              onPress={() => navigation.navigate("Profile")}
            />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  );
}
