import { View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginView from "../views/LoginView";
import { Text, BottomNavigation } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";
import HomeView from "../views/main-app/HomeView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserIcon from "../components/UserIcon";
import ProfileView from "../views/main-app/ProfileView";

const Tab = createBottomTabNavigator();

export default function MainAppStack() {
  const navigation = useNavigation();
  return (
    <>
      {/* <UserIcon navigation={navigation} /> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
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
          component={HomeView}
          options={{
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="weight-lifter" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Diet"
          component={HomeView}
          options={{
            tabBarLabel: "Diet",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="food" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
