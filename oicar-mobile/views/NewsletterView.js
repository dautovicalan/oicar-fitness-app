import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Switch, Button } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";

export default function NewsletterView({ navigation }) {
  const { currentNewUser, setEnableNewsletter } = useRegistrationProcess();
  const [newsletter, setNewsletter] = useState(true);

  const handleClick = async () => {
    if (!currentNewUser || currentNewUser.id === 0) {
      return Alert.alert("Something went wrong with user");
    }

    try {
      const response = await fetch(
        "http://localhost:5280/api/UserPreferences/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentNewUser.id,
            weight: currentNewUser.weight,
            height: currentNewUser.height,
            goal: currentNewUser.goal,
            workoutNumberPerWeek: currentNewUser.workoutsNumber,
            newsletter: newsletter,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        return Alert.alert("Something went wrong");
      }
      console.log(result);

      //set main context

      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Text variant="headlineSmall">Subscribe To Newsletter</Text>
        <Switch
          value={newsletter}
          onChange={() => setNewsletter((prevVal) => !prevVal)}
        />
      </View>
      <Button mode="contained" icon="rocket" onPress={handleClick}>
        Finish Profile Creation
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  textBorder: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedBorder: {
    borderColor: "red",
  },
});