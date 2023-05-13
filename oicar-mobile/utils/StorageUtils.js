import AsyncStorage from "@react-native-async-storage/async-storage";

// Utility function to read data from storage
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

// Utility function to write data to storage
export const writeToStorage = async (userId, value) => {
  try {
    await AsyncStorage.setItem(userId, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to storage for key ${userId}: ${error}`);
  }
};
