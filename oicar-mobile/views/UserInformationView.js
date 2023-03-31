import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";

export default function UserInformationView({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <Text>Tell Us About You</Text>
      <View style={style.formContainer}>
        <TextInput label={"Name"} />
        <TextInput label={"Surname"} />
        <TextInput label={"E-Mail"} />
        <TextInput label={"Password"} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("About You")}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    gap: 20,
  },
});
