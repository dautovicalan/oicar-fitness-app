import { StyleSheet, SafeAreaView, Image } from "react-native";
import { Button } from "react-native-paper";

export const InitialView = ({ navigation }) => {
  const handleGetStartedClick = () => {
    navigation.navigate("Register");
  };

  const handleAlreadyHaveAnAccountClick = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={stlyes.container}>
      <Image
        source={require("../../assets/fitpal.png")}
        style={{ width: 200, height: 200 }}
      />
      <Button
        mode="contained"
        onPress={handleGetStartedClick}
        icon="rocket-launch"
      >
        Get Started
      </Button>
      <Button
        mode="contained"
        onPress={handleAlreadyHaveAnAccountClick}
        icon="account"
      >
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
