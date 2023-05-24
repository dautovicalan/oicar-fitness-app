import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import HomeView from "../views/main-views/HomeView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileView from "../views/main-views/ProfileView";
import WorkoutView from "../views/main-views/WorkoutView";
import SettingsView from "../views/main-views/SettingsView";
import WorkoutStack from "./WorkoutStack";
import DietView from "../views/main-views/DietView";
import DietStack from "./DietStack";

const Tab = createBottomTabNavigator();

export default function MainAppStack() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            activeColor="orange"
            inactiveColor="black"
            style={{ backgroundColor: "white" }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Workouts"
          component={WorkoutStack}
          options={{
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="weight-lifter" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Diet"
          component={DietStack}
          options={{
            tabBarLabel: "Diet",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="food" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileView}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account-circle" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsView}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="apple" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
