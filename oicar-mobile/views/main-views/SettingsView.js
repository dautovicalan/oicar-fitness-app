import { View, StyleSheet, Alert, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { UserContext, useUserContext } from "../../context/UserContext";
import { Text } from "react-native-paper";

export default function SettingsView({ navigation }) {
  const { logout } = useUserContext();

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("delete");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Button
        mode="contained"
        onPress={() => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        }}
      >
        Logout
      </Button>
      <View
        style={{
          borderTopColor: "black",
          borderTopWidth: 5,
          width: "100%",
          padding: 10,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          Danger Zone
        </Text>
        <Button onPress={handleDeleteProfile}>Delete Profile</Button>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
