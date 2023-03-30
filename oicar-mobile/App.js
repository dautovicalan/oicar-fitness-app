import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
} from "react-native-paper";
import { InitialView } from "./views/InitialView";

export default function App() {
  const [email, setEmail] = useState("");

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          label={"Email"}
          value={email}
          style={{ width: "90%" }}
          onChangeText={(e) => {
            setEmail(e);
          }}
        />
        <Button
          raised
          theme={{ roundness: 3 }}
          onPress={() => {
            console.log(email);
          }}
        >
          Test
        </Button>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <InitialView />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
