import { View, StyleSheet, Alert, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import { Text } from "react-native-paper";

export default function SettingsView({ navigation }) {
  const { user, logout } = useUserContext();

  const handleDeleteProfile = async () => {
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
          onPress: async () => {
            try {
              const request = await fetch(
                `http://localhost:5280/api/Account/Delete?idUser=${user.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
                  },
                }
              );
              if (request.status === 200) {
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Welcome" }],
                });
              }
            } catch (error) {
              Alert.alert("Something went wrong");
            }
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
