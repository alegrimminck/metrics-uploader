import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem("data");
    if (data === null) {
      throw new Error("getData: data is null");
    }
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    throw new Error("getData: Error in getData()");
  }
};

export const getFifoArray = async () => {
  try {
    const fifoArray = await AsyncStorage.getItem("fifoArray");
    if (fifoArray === null) {
      throw new Error("getFifoArray: fifoArray is null");
    }
    return JSON.parse(fifoArray);
  } catch (e) {
    console.log(e);
    throw new Error("getFifoArray: Error in getFifoArray()");
  }
};

export const handleResetToFirstTimeOpen = async () => {
  try {
    await AsyncStorage.removeItem("firstTimeOpen");
    await AsyncStorage.removeItem("data");
    await AsyncStorage.removeItem("fifoArray");
    console.log("data removed");
  } catch {
    throw new Error(
      "handleResetToFirstTimeOpen: Error in handleResetToFirstTimeOpen()"
    );
  }
};
