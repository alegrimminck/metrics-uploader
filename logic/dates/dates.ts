import moment, { Moment } from "moment-timezone";
import { getDataDay } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToday = async () => {
  try {
    const data: string = await AsyncStorage.getItem("today");
    if (data === null) {
      throw new Error("getToday: today is null");
    }
    const stringDate = JSON.parse(data);
    return moment(stringDate);
  } catch (e) {
    console.log(e);
    throw new Error("getToday: Error in getToday()");
  }
};

export const getPossiblyFirstTimeToday = async () => {
  try {
    const data = await AsyncStorage.getItem("today");
    if (data === null) {
      const today = moment().tz("America/Santiago");
      await setToday(today);
      return today;
    }
    const stringDate = JSON.parse(data);
    return moment(stringDate);
  } catch {
    throw new Error(
      "getPossiblyFirstTimeToday: Error in getPossiblyFirstTimeToday()"
    );
  }
};

export const setToday = async (date: Moment) => {
  await AsyncStorage.setItem("today", JSON.stringify(date));
};

export const hasPassedAtLeastOneDay = async (today): Promise<Boolean> => {
  const dataDay = await getDataDay();

  if (dataDay.isBefore(today, "day")) {
    return true;
  }

  return false;
};
