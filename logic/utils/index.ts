import AsyncStorage from "@react-native-async-storage/async-storage";
import { todayDataTemplate } from "../templates/defaultMetrics";
import moment from "moment";

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

export const getDataDay = async () => {
  const data = await getData();
  return moment(data.date);
};

export const setData = async () => {
  console.log("Setting data!");
  const template = await todayDataTemplate();
  await AsyncStorage.setItem("data", JSON.stringify(template));
};

export const updateDataMetric = async (metricValue) => {
  const data = await getData();
  await AsyncStorage.setItem(
    "data",
    JSON.stringify({ ...data, chatarra: metricValue })
  );
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

export const setFifoArray = async (fifoArray) => {
  await AsyncStorage.setItem("fifoArray", JSON.stringify(fifoArray));
};

export const handleResetToFirstTimeOpen = async (updateFifo) => {
  try {
    await AsyncStorage.removeItem("firstTimeOpen");
    await AsyncStorage.removeItem("data");
    await AsyncStorage.removeItem("fifoArray");
    updateFifo([]);
    console.log("data removed");
  } catch {
    throw new Error(
      "handleResetToFirstTimeOpen: Error in handleResetToFirstTimeOpen()"
    );
  }
};
