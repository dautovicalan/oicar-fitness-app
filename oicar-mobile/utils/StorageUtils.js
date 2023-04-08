import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeMetric = async (value) => {
  try {
    await AsyncStorage.setItem("metric", value);
  } catch (error) {
    console.error(error);
  }
};

export const getMetric = async () => {
  try {
    const value = await AsyncStorage.getItem("metric");
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
