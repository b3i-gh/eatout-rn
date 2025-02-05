import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (restaurants) => {
  try {
    await AsyncStorage.setItem("@restaurants", JSON.stringify(restaurants));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

// Load data from AsyncStorage
export const loadData = async () => {
  try {
    const data = await AsyncStorage.getItem("@restaurants");
    if (data) {
      return JSON.parse(data);
    } else {
      return [[], [], [], [], [], [], [], [], []];
    }
  } catch (e) {
    console.error("Failed to load data", e);
  }
};
