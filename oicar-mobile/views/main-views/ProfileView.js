import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, List, Switch, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import AnimatedAccordion from "../../components/boxes/AnimatedAccordion";
import EditProfile from "../../components/profile/EditProfile";
import ChangePasswordDialog from "../../components/profile/ChangePasswordDialog";
import { useUserContext } from "../../context/UserContext";

export default function ProfileView() {
  const { user } = useUserContext();
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View>
        <Text variant="displaySmall">Your Profile</Text>
      </View>
      <Avatar.Image source={require("../../assets/andrew.jpeg")} size={100} />
      {editProfile === false && (
        <>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Name</Text>
            <Text>
              {user.name} {user.surname}
            </Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Your Goal</Text>
            <Text>{user.goal}</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Your Workouts</Text>
            <Text>{user.workoutNumberPerWeek}</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Weight</Text>
            <Text>{user.weight} KG</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Height</Text>
            <Text>{user.height} CM</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Newsletter</Text>
            <Text>{user.newsletter ? "Subscribed" : "Not subscribed"}</Text>
          </View>
        </>
      )}
      {editProfile && (
        <EditProfile
          onSave={() => setEditProfile((prevVal) => !prevVal)}
          userData={user}
        />
      )}
      {!editProfile && (
        <View style={style.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => setEditProfile((preVal) => !preVal)}
          >
            Edit Profile
          </Button>
          <Button
            mode="contained"
            onPress={() => setChangePassword((prevVal) => !prevVal)}
          >
            Change Password
          </Button>
        </View>
      )}
      <ChangePasswordDialog
        visible={changePassword}
        setVisible={() => setChangePassword((prevVal) => !prevVal)}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  headerText: {
    fontWeight: "bold",
  },
});
