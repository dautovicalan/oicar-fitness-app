import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  TextInput,
} from "react-native-paper";
import { useUserContext } from "../../context/UserContext";

const ChangePasswordDialog = ({ visible, setVisible }) => {
  const { user } = useUserContext();

  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== repeatNewPassword) {
      return Alert.alert("Passwords do not match");
    }
    const request = await fetch(
      "http://localhost:5280/api/Account/ChangePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        body: JSON.stringify({ email: user.email, password: password }),
      }
    );
  };

  return (
    <Portal>
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
          <Button onPress={setVisible}>Cancel</Button>
          <Button onPress={setVisible}>Change</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    gap: 20,
  },
});

export default ChangePasswordDialog;
