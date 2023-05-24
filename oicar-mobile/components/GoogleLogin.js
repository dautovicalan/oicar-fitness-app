import { View, Text, Pressable, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";

export default function GoogleLogin() {
  const [token, setToken] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "971150090379-ckoc4re0ltkd2v6qli5nse34e0hcbsjk.apps.googleusercontent.com",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const request = await fetch(
          "http://localhost:5280/api/Account/LoginGoogle?accessToken=" + token,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );

        if (request.status !== 200) {
          return Alert.alert("Something went wrong");
        }
        const response = await request.json();
        console.log("POZDRAV " + response);
      } catch (error) {
        console.log(error);
      }
    };

    if (response?.type === "success") {
      setToken(response.authentication.idToken);
      getUserInfo();
    }
  }, [response, token]);

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
