import { View } from "react-native";
import React, { useState, useRef } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import { Text } from "react-native-paper";

export default function AnimatedAccordion({ title, value, content, height }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isExpanded) {
      setIsExpanded(false);
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      setIsExpanded(true);
      Animated.timing(heightAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={style.container}>
      <Pressable onPress={handlePress}>
        <View style={style.containerInfo}>
          <Text style={{ fontWeight: "bold" }}>Change {title}</Text>
          <Text>{value}</Text>
        </View>
      </Pressable>
      <Animated.View style={[{ height: heightAnim, opacity: opacityAnim }]}>
        <Animatable.View style={style.animatedView} animation="fadeIn">
          {content}
        </Animatable.View>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 15,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  animatedView: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
