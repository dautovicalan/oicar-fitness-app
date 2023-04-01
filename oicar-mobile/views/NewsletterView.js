import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, Switch, Button } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";

export default function NewsletterView({ navigation }) {
  const { setEnableNewsletter } = useRegistrationProcess();
  const [newsletter, setNewsletter] = useState(true);

  const handleClick = () => {
    if (!newsletter) {
    }
    setEnableNewsletter(newsletter);

    // call API

    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }],
    });
  };

  return (
    <View style={style.container}>
      <Text variant="displayMedium">
        Stay Motivated With Our Weekly Newsletter
      </Text>
      <Switch
        value={newsletter}
        onChange={() => setNewsletter((prevVal) => !prevVal)}
      />
      <Button mode="contained">Finish Profile Creation</Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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
