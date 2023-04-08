import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, List, Switch, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import AnimatedAccordion from "../../components/boxes/AnimatedAccordion";
import EditProfile from "../../components/profile/EditProfile";
import ChangePasswordDialog from "../../components/profile/ChangePasswordDialog";

export default function ProfileView() {
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
            <Text>Alan Dautovic</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Your Goal</Text>
            <Text>Gain Muscle</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Weight</Text>
            <Text>90 KG</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Height</Text>
            <Text>190 CM</Text>
          </View>
          <View style={style.innerContainer}>
            <Text style={style.headerText}>Newsletter</Text>
            <Text>Subscribed</Text>
          </View>
        </>
      )}
      {editProfile && (
        <EditProfile onSave={() => setEditProfile((prevVal) => !prevVal)} />
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
