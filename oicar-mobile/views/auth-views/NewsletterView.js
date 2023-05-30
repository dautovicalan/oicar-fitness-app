import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Switch, Button } from "react-native-paper";
import { useRegistrationProcess } from "../../context/RegistrationProcessContext";
import { useUserContext } from "../../context/UserContext";

export default function NewsletterView({ navigation, route }) {
  const { workoutNumberPerWeek } = route.params;
  const { setUserInfo } = useUserContext();
  const { currentNewUser, setEnableNewsletter } = useRegistrationProcess();
  const [newsletter, setNewsletter] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
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
            workoutNumberPerWeek: workoutNumberPerWeek,
            newsletter: newsletter,
          }),
        }
      );
      if (!response.ok) {
        return Alert.alert("Something went wrong");
      }
      const result = await response.json();

      console.log(result);

      //set main context

      setUserInfo({
        id: currentNewUser.id,
        name: currentNewUser.firstName,
        surname: currentNewUser.lastName,
      });

      return navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      <Button
        mode="contained"
        icon="rocket"
        onPress={handleClick}
        disabled={loading}
      >
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
