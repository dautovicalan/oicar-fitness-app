import { View, Text, Pressable, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { useUserContext } from "../context/UserContext";
import { set } from "date-fns";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";

export default function GoogleLogin({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();
  const { setUserInfo } = useUserContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "971150090379-ckoc4re0ltkd2v6qli5nse34e0hcbsjk.apps.googleusercontent.com",
  });

  useEffect(() => {
    const getUserInfo = async (token) => {
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

        console.log("OVO JE " + request.status);
        if (request.status !== 200) {
          throw new Error("Something went wrong");
        }
        const result = await request.json();
        if (result?.isRegister && result.isRegister === true) {
          setUserInfo({
            id: result.idUser,
            accessToken: result.accessToken,
          });
          return navigation.reset({
            index: 0,
            routes: [{ name: "MainApp" }],
          });
        }

        setBasicInfo({
          id: result.idUser,
          isRegister: result.isRegister,
        });

        navigation.navigate("Register", {
          screen: "About You",
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (response?.type === "success") {
      getUserInfo(response.authentication.idToken);
    }
  }, [response]);

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
