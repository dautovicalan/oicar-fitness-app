import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

export const InitialView = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg",
        }}
      />
      <Text>FitPal</Text>
      <Button mode="contained">Get Started</Button>
      <Button mode="contained" style={{ marginTop: 10 }}>
        I Already Have An Account
      </Button>
    </View>
  );
};
