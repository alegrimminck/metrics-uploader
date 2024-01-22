import AsyncStorage from "@react-native-async-storage/async-storage";
import { todayDataTemplate } from "../templates/defaultMetrics";
import { setData } from "../utils";
import { setToday } from "../dates/dates";

export const firstTimeOpenInitialization = async () => {
  const isFirstTime = await fetchIsFirstTime();
  if (isFirstTime) {
    try {
      await AsyncStorage.setItem("fifoArray", JSON.stringify([]));
      await setData();
    } catch (e) {
      throw new Error(
        "firstTimeOpenInitialization: Error in firstTimeOpenInitialization()"
      );
    }
  }

  return;
};

const fetchIsFirstTime = async (): Promise<Boolean> => {
  try {
    const firstTimeOpen = await AsyncStorage.getItem("firstTimeOpen");
    if (firstTimeOpen === null) {
      await AsyncStorage.setItem("firstTimeOpen", "false");
      return true;
    }
    return false;
  } catch (e) {
    throw new Error("firstTimeOpenInitialization: Error in isFirstTime()");
  }
};
