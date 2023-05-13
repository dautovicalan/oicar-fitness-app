import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import HomeBox from "../../components/home/HomeBox";

export default function HomeView() {
  const { user } = useUserContext();

  console.log("HOME");
  console.log(user);

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
          <HomeBox text="Your Calories" color="#3FBD86" />
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
