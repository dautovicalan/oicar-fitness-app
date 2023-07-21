import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutYouView from "../views/auth-views/AboutYouView";
import GoalView from "../views/auth-views/GoalView";
import UserInformationView from "../views/auth-views/UserInformationView";
import WorkoutPerWeekSelectionView from "../views/auth-views/WorkoutPerWeekSelectionView";
import NewsletterView from "../views/auth-views/NewsletterView";
import MainAppStack from "./MainAppStack";
import CustomBackButton from "../components/CustomBackButton";

const Stack = createNativeStackNavigator();

export default function RegistrationProcessStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Basic Info"
        component={UserInformationView}
        options={({ navigation, route }) => ({
          title: "Account Information",
          headerLeft: (props) => (
            <CustomBackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="About You"
        component={AboutYouView}
        options={({ navigation, route }) => ({
          title: "About you",
          headerLeft: (props) => (
            <CustomBackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Goal"
        component={GoalView}
        options={({ navigation, route }) => ({
          title: "Your goals",
          headerLeft: (props) => (
            <CustomBackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Workouts"
        component={WorkoutPerWeekSelectionView}
        options={({ navigation, route }) => ({
          title: "Your workouts",
          headerLeft: (props) => (
            <CustomBackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="Newsletter"
        component={NewsletterView}
        options={({ navigation, route }) => ({
          title: "Subscribe To Newsletter",
          headerLeft: (props) => (
            <CustomBackButton {...props} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen name="MainApp" component={MainAppStack} />
    </Stack.Navigator>
  );
}
