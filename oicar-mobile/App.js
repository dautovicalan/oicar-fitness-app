import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { RegistrationProcessContextProvider } from "./context/RegistrationProcessContext";
import * as WebBrowser from "expo-web-browser";
import "react-native-gesture-handler";
import { UserContextProvider } from "./context/UserContext";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#000000",
      accent: "orange",
    },
  };

  return (
    <RegistrationProcessContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <AuthStack />
          </PaperProvider>
        </NavigationContainer>
      </UserContextProvider>
    </RegistrationProcessContextProvider>
  );
}
