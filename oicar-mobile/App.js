import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { RegistrationProcessContextProvider } from "./context/RegistrationProcessContext";
import * as WebBrowser from "expo-web-browser";
import "react-native-gesture-handler";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <RegistrationProcessContextProvider>
      <NavigationContainer>
        <PaperProvider>
          <AuthStack />
        </PaperProvider>
      </NavigationContainer>
    </RegistrationProcessContextProvider>
  );
}
