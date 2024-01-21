import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useRestoreUserIfSavedToken = (dispatch, state) => {
  useEffect(() => {
    async function getToken() {
      let token;
      try {
        token = await AsyncStorage.getItem("@accessToken");
      } catch (e) {
        throw new Error("Error while trying to get token from AsyncStorage");
      }
      dispatch({ type: "RESTORE_USER", token: token });
    }
    getToken();

    console.log(
      `Just after render, this is the state: userToken: ${state.userToken}, isLoading: ${state.isLoading}, isSignout: ${state.isSignout}`
    );
  }, []);
};
