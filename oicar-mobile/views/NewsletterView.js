import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, Switch, Button } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";

export default function NewsletterView({ navigation }) {
  const { currentNewUser, setEnableNewsletter } = useRegistrationProcess();
  const [newsletter, setNewsletter] = useState(true);

  const handleClick = async () => {
    // call API

    try {
      const response = await fetch("");
      const result = response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "MainApp" }],
    // });
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
