import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import AnimatedAccordion from "../boxes/AnimatedAccordion";
import { Button, Switch } from "react-native-paper";
import HeightPicker from "../HeightPicker";
import WeightPicker from "../WeightPicker";
import { fitnessGoals } from "../../data/FitnessData";
import { workoutsPerWeek } from "../../data/FitnessData";

export default function EditProfile({ onSave, userData }) {
  const userId = userData.id;
  const [weight, setWeight] = useState(userData.weight);
  const [height, setHeight] = useState(userData.height);
  const [goal, setGoal] = useState(userData.goal);
  const [workoutNumberPerWeek, setWorkoutNumberPerWeek] = useState(
    userData.workoutNumberPerWeek
  );
  const [newsletter, setNewsletter] = useState(userData.newsletter);
  const [loading, setLoading] = useState(false);

  const handleWeightChange = (weight) => {
    setWeight(weight);
  };

  const handleHeightChange = (height) => {
    setHeight(height);
  };

  const handleNewsletterChange = () => {
    setNewsletter((prevVal) => !prevVal);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        `http://localhost:5280/api/UserPreferences/Update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.accessToken}`,
          },
          body: JSON.stringify({
            userId,
            weight,
            height,
            goal,
            workoutNumberPerWeek: 5,
            newsletter,
          }),
        }
      );
      if (request.status === 200) {
        Alert.alert("Success", "Your profile has been updated");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      onSave();
    }
  };

  return (
    <>
      <AnimatedAccordion
        title={"Weight"}
        height={220}
        value={weight + " KG"}
        content={
          <WeightPicker
            selectedWeight={weight}
            onWeightChange={handleWeightChange}
            width={"100%"}
          />
        }
      />
      <AnimatedAccordion
        title={"Height"}
        height={220}
        value={height + " CM"}
        content={
          <HeightPicker
            selectedHeight={height}
            onHeightChange={handleHeightChange}
            width={"100%"}
          />
        }
      />
      <AnimatedAccordion
        title={"Goal"}
        height={200}
        content={
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 10,
            }}
          >
            {fitnessGoals.map((fitnessGoal) => (
              <Pressable
                key={fitnessGoal.id}
                onPress={() => setGoal(fitnessGoal.text)}
              >
                <Text
                  style={{
                    padding: 10,
                    borderColor: fitnessGoal.text === goal ? "orange" : "grey",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  {fitnessGoal.text}
                </Text>
              </Pressable>
            ))}
          </View>
        }
        value={goal}
      />
      <AnimatedAccordion
        title={"Workouts Num."}
        height={100}
        content={
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 10,
            }}
          >
            {workoutsPerWeek.map((workoutPerWeek) => (
              <Pressable
                key={workoutPerWeek.id}
                onPress={() => setWorkoutNumberPerWeek(workoutPerWeek.id)}
              >
                <Text
                  style={{
                    padding: 10,
                    borderColor:
                      workoutPerWeek.id === workoutNumberPerWeek
                        ? "orange"
                        : "grey",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  {workoutPerWeek.text}
                </Text>
              </Pressable>
            ))}
          </View>
        }
        value={workoutNumberPerWeek}
      />
      <AnimatedAccordion
        title={"Newsletter"}
        height={70}
        value={newsletter ? "Subscribed" : "Unsubscribed"}
        content={
          <Switch value={newsletter} onChange={handleNewsletterChange} />
        }
      />
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-around",
        }}
      >
        <Button mode="outlined" onPress={onSave} disabled={loading}>
          Cancel
        </Button>
        <Button mode="contained" onPress={handleSubmit} disabled={loading}>
          Save
        </Button>
      </View>
    </>
  );
}
