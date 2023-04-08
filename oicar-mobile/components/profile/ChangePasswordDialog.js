import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  TextInput,
} from "react-native-paper";

const ChangePasswordDialog = ({ visible, setVisible }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={setVisible}>
        <Dialog.Title>Change Password</Dialog.Title>
        <Dialog.Content style={style.innerContainer}>
          <TextInput label={"Current Password"} secureTextEntry={true} />
          <TextInput label={"New Password"} secureTextEntry={true} />
          <TextInput label={"Repeat New Password"} secureTextEntry={true} />
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
