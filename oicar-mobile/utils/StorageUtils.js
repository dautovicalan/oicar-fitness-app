import AsyncStorage from "@react-native-async-storage/async-storage";

export const readFromStorage = async (userId) => {
  try {
    const value = await AsyncStorage.getItem(userId);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(`Error reading from storage for key ${userId}: ${error}`);
  }
};

export const writeToStorage = async (userId, value) => {
  try {
    await AsyncStorage.setItem(userId, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to storage for key ${userId}: ${error}`);
  }
};
