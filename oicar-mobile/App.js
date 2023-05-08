import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { RegistrationProcessContextProvider } from "./context/RegistrationProcessContext";
import * as WebBrowser from "expo-web-browser";
import "react-native-gesture-handler";
import { UserContextProvider } from "./context/UserContext";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <RegistrationProcessContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <PaperProvider>
            <AuthStack />
          </PaperProvider>
        </NavigationContainer>
      </UserContextProvider>
    </RegistrationProcessContextProvider>
  );
}
