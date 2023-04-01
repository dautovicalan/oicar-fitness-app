import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TabSelector = ({ tabs, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = (index) => {
    if (index === selectedTab) {
      return;
    }
    setSelectedTab(index);
    onChange && onChange(index);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedTab === index && styles.tabSelected,
            index === 0 && styles.tabFirst,
            index === tabs.length - 1 && styles.tabLast,
          ]}
          onPress={() => handleTabPress(index)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === index && styles.tabTextSelected,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  tabFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tabLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  tabSelected: {
    backgroundColor: "red",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  tabTextSelected: {
    color: "#fff",
  },
});

export default TabSelector;
