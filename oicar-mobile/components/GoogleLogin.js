import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";

export default function GoogleLogin() {
  const [token, setToken] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "609881614284-dqc1n38lufdbudbga094di5ag2clufg9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.idToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    // authenticate token to our REST APi
    try {
      console.log(token);
      const resposne = await fetch(
        "http://localhost:5280/api/Account/LoginGoogle",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ accessToken: token }),
        }
      );

      if (resposne.status !== 200) {
        return Alert.alert("Something went wrong");
      }
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable style={style.singlePicture} onPress={() => promptAsync()}>
      <Image
        source={require("../assets/googlesvg.png")}
        style={{ width: 30, height: 30 }}
      />
    </Pressable>
  );
}

const style = {
  singlePicture: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
};
