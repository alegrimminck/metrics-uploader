import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataDeveloper = async () => {
  try {
    const data = await AsyncStorage.getItem("data");
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    throw new Error("getData: Error in getData()");
  }
};

export const getFifoArrayDeveloper = async () => {
  try {
    const fifoArray = await AsyncStorage.getItem("fifoArray");
    if (fifoArray === null) {
      return null;
    }
    return JSON.parse(fifoArray);
  } catch (e) {
    console.log(e);
    throw new Error("getFifoArray: Error in getFifoArray()");
  }
};
