import AsyncStorage from "@react-native-async-storage/async-storage";
import { readFromStorage, writeToStorage } from "../../utils/StorageUtils";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("readFromStorage", () => {
  it("should read data from storage correctly", async () => {
    const userId = "123";
    const value = { name: "John Doe" };

    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(value));

    const result = await readFromStorage(userId);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(userId);
    expect(result).toEqual(value);
  });
});

describe("writeToStorage", () => {
  it("should write data to storage correctly", async () => {
    const userId = "123";
    const value = { name: "John Doe" };

    await writeToStorage(userId, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      userId,
      JSON.stringify(value)
    );
  });
});
