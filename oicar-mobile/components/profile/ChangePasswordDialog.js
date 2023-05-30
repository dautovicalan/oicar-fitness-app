import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  TextInput,
} from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";

const ChangePasswordDialog = ({ visible, setVisible }) => {
  const { user } = useUserContext();

  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    if (newPassword === "" || repeatNewPassword === "") {
      setLoading(false);
      return Alert.alert("Please fill all fields");
    }
    if (newPassword !== repeatNewPassword) {
      setLoading(false);
      return Alert.alert("Passwords do not match");
    }

    try {
      const request = await fetch(
        "http://localhost:5280/api/Account/ChangePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            email: user.email,
            password: newPassword,
          }),
        }
      );
      if (request.status === 200) {
        setNewPassword("");
        setRepeatNewPassword("");
        setVisible();
        Alert.alert("Password changed");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewPassword("");
    setRepeatNewPassword("");
    setVisible();
  };

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Dialog visible={visible} onDismiss={setVisible}>
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Content style={style.innerContainer}>
            <TextInput
              label={"New Password"}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              label={"Repeat New Password"}
              value={repeatNewPassword}
              onChangeText={(text) => setRepeatNewPassword(text)}
              secureTextEntry={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button onPress={handleChangePassword} disabled={loading}>
              Change
            </Button>
          </Dialog.Actions>
        </Dialog>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    gap: 20,
    paddingBottom: 90,
  },
});

export default ChangePasswordDialog;
