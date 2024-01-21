import AsyncStorage from "@react-native-async-storage/async-storage";
import { todayDataTemplate } from "../templates/defaultMetrics";

export const firstTimeOpenInitialization = async () => {
  const isFirstTime = await fetchIsFirstTime();
  if (isFirstTime) {
    try {
      await AsyncStorage.setItem("fifoArray", JSON.stringify([]));
      await AsyncStorage.setItem("data", JSON.stringify(todayDataTemplate()));
    } catch (e) {
      throw new Error(
        "firstTimeOpenInitialization: Error in firstTimeOpenInitialization()"
      );
    }
  }

  return;
};

const fetchIsFirstTime = async () => {
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
