import { StyleSheet, SafeAreaView, Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

export const InitialView = ({ navigation }) => {
  const handleGetStartedClick = () => {
    navigation.navigate("Register");
  };

  const handleAlreadyHaveAnAccountClick = () => {
    navigation.navigate("Login");
  };

  const handleGdprClick = () => {
    navigation.navigate("GDPR");
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
      <View style={{ marginTop: 50 }}>
        <Text variant="titleSmall" style={{ textAlign: "center" }}>
          By clicking Get Started you agree to our Terms of Service and Privacy.
        </Text>
        <Button onPress={handleGdprClick}>GDPR Policy</Button>
      </View>
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
