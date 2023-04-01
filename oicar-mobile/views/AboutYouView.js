import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";
import BirthdayDatePicker from "../components/BirthdayDatePicker";
import HeightPicker from "../components/HeightPicker";
import WeightPicker from "../components/WeightPicker";

export default function AboutYouView({ navigation }) {
  const { setAboutYouInfo } = useRegistrationProcess();

  const [birthday, setBirthday] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const handleClick = () => {
    setAboutYouInfo({
      birthday,
      height,
      weight,
    });

    navigation.navigate("Goal");
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.row}>
        <Text>Birthday</Text>
        <BirthdayDatePicker />
      </View>
      <View style={style.row}>
        <Text>Height</Text>
        <HeightPicker />
      </View>
      <View style={style.row}>
        <Text>Weight</Text>
        <WeightPicker />
      </View>
      <Button mode="contained" style={{ width: "80%" }} onPress={handleClick}>
        Next
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
