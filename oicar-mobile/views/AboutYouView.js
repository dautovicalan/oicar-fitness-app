import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Text, Divider } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";
import BirthdayDatePicker from "../components/BirthdayDatePicker";
import HeightPicker from "../components/HeightPicker";
import WeightPicker from "../components/WeightPicker";
import { validateAboutYouForm } from "../utils/FormValidatonUtils";

export default function AboutYouView({ navigation }) {
  const { currentNewUser, setAboutYouInfo } = useRegistrationProcess();

  const [birthday, setBirthday] = useState(new Date());
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const [errors, setErrors] = useState();

  const handleDateChange = (newDate) => {
    setBirthday(newDate);
  };

  const handleHeightChange = (height) => {
    setHeight(height);
  };

  const handleWeightChange = (weight) => {
    setWeight(weight);
  };

  const handleClick = async () => {
    const validateDate = await validateAboutYouForm({
      birthday,
      height,
      weight,
    });

    if (!validateDate.isValid) {
      console.log(validateDate.errors);
      Alert.alert("Something went wrong");
      return setErrors(validateDate.errors);
    }

    setAboutYouInfo({
      birthday: birthday,
      height: height,
      weight: weight,
    });

    return navigation.navigate("Goal");
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={Array.of(style.row, { gap: 27 })}>
        <Text variant="headlineSmall" style={style.rowText}>
          Birthday
        </Text>
        <BirthdayDatePicker
          userBirthday={birthday}
          onDateChange={handleDateChange}
        />
      </View>
      <View style={style.row}>
        <Text variant="headlineSmall" style={style.rowText}>
          Height
        </Text>
        <HeightPicker
          selectedHeight={height}
          onHeightChange={handleHeightChange}
        />
      </View>
      <View style={style.row}>
        <Text variant="headlineSmall" style={style.rowText}>
          Weight
        </Text>
        <WeightPicker
          selectedWeight={weight}
          onWeightChange={handleWeightChange}
        />
      </View>
      <Button
        mode="contained"
        style={{ width: "80%" }}
        onPress={handleClick}
        icon="rocket-launch"
      >
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
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    borderColor: "black",
    borderBottomWidth: 2,
    padding: 2,
  },
  rowText: {
    fontWeight: "bold",
  },
});
