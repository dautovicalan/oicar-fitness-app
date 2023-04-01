import { useNavigation } from "@react-navigation/native";
import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";

export const InitialView = ({ navigation }) => {
  const handleGetStartedClick = () => {
    navigation.navigate("Register");
  };

  const handleAlreadyHaveAnAccountClick = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={stlyes.container}>
      <Text variant="displayLarge" style={{ textAlign: "center" }}>
        FitPal
      </Text>
      <Button mode="contained" onPress={handleGetStartedClick}>
        Get Started
      </Button>
      <Button mode="contained" onPress={handleAlreadyHaveAnAccountClick}>
        I Already Have An Account
      </Button>
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});