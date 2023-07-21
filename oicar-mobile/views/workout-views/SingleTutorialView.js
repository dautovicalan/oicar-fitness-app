import { StyleSheet, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { OpenAIApi } from "openai";
import configuration from "../../config/openai.config";
import { useUserContext } from "../../context/UserContext";

export default function SingleTutorialView({ route }) {
  const { user } = useUserContext();
  const { workoutName, workoutGif } = route.params;

  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const generateText = async () => {
      try {
        const openai = new OpenAIApi(configuration);
        const gptResponse = await openai.createCompletion({
          model: "text-ada-001",
          prompt: `Explain how to do ${workoutName} exercise. 
        Take into account that the person who is reading this is a beginner.
        He is ${user.height}cm tall and weighs ${user.weight}kg.
        Also he wants to achieve ${user.goal} goal.
        He is working out 3 times per week. Also encurage him to stay motivated and to not give up.`,
          temperature: 0.7,
          max_tokens: 1024,
        });
        setGeneratedText(gptResponse.data.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    };
    generateText();
  }, []);

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text variant="displaySmall" style={{ marginTop: 10 }}>
        {workoutName}
      </Text>
      <Image source={{ uri: workoutGif }} style={{ width: 150, height: 150 }} />
      {generatedText ? (
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", padding: 10 }}
        >
          {generatedText}
        </Text>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginVertical: 10,
  },
});
