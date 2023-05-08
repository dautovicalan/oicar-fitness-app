import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import GoalBox from "../../components/home/GoalBox";
import CaloriesBox from "../../components/home/CaloriesBox";
import WorkoutBox from "../../components/home/WorkoutBox";
import { Text } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";

export default function HomeView() {
  const { getUserInfo } = useUserContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={style.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        variant="displaySmall"
        style={{
          marginBottom: 50,
        }}
      >
        Welcome Back, {getUserInfo()?.name} 💪
      </Text>
      <View style={style.firstInnerContainer}>
        <View>
          <GoalBox />
        </View>
        <View>
          <CaloriesBox />
        </View>
      </View>
      <View style={style.secondInnerContainer}>
        <View>
          <WorkoutBox />
        </View>
        <View>
          <WorkoutBox />
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
    gap: 20,
  },
  firstInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25%",
    gap: 20,
  },
  firstInnerItem: {},
  secondInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25%",
    gap: 20,
  },
});
