import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useHandleGoogleSignInResponse = (dispatch, response) => {
  useEffect(() => {
    async function handleSignInResponse() {
      try {
        if (response?.type === "success") {
          const token = response.authentication.accessToken;
          await AsyncStorage.setItem("@accessToken", token);
          dispatch({ type: "SIGN_IN", token: token });
        }
      } catch (error) {
        throw new Error("Google response was not success");
      }
    }
    handleSignInResponse();
  }, [response]);
};
