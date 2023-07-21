import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import HomeBox from "../../components/home/HomeBox";

export default function HomeView() {
  const { user } = useUserContext();

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text
        variant="displaySmall"
        style={{
          marginBottom: 50,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Welcome Back, {user?.name} 💪
      </Text>
      <View style={style.firstInnerContainer}>
        <View>
          <HomeBox
            text="Follow Your Goal"
            userText={user?.goal}
            color="#FF5668"
          />
        </View>
        <View>
          <HomeBox
            text="Your Workouts"
            userText={user?.workoutNumberPerWeek}
            color="#3FBD86"
          />
        </View>
      </View>
      <View style={style.secondInnerContainer}>
        <View>
          <HomeBox
            text="Current Weight"
            userText={user?.weight}
            color="#FE7F61"
          />
        </View>
        <View>
          <HomeBox text="Just DO It" color="#F1C231" />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  firstInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "25%",
    gap: 20,
  },
  firstInnerItem: {},
  secondInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "25%",
    gap: 20,
  },
});
