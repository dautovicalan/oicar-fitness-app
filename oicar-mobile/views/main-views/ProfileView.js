import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";

export default function ProfileView() {
  return (
    <View style={style.container}>
      <Avatar.Image source={require("../../assets/googlesvg.png")} size={100} />
      <View>
        <Text variant="displaySmall">Your Profile</Text>
      </View>
      <View>
        <Text>Alan Dautovic</Text>
      </View>
      <View>
        <Text>Goal</Text>
      </View>
      <View>
        <Text>Newsletter</Text>
      </View>
      <View>
        <Button mode="contained">Edit Profile</Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
