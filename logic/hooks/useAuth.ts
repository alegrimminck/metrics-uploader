import { useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToday, setToday } from "../dates/dates";
import { setFifoArray } from "../utils";

export function useAuthContext(state, dispatch, promptAsync) {
  return useMemo(
    () => ({
      signIn: async () => {
        await signInLogic(dispatch, promptAsync, state);
      },
      signOut: async () => {
        await signOutLogic(dispatch);
      },
      updateToday: async (today) => {
        await updateTodayLogic(dispatch, today);
      },
      updateFifo: async (fifo) => {
        await updateFifoLogic(dispatch, fifo);
      },
      fifo: state.fifo,
      userToken: state.userToken,
      today: state.today,
    }),
    [state.userToken, state.today, state.fifo, dispatch, promptAsync]
  );
}

async function signInLogic(dispatch, promptAsync, state) {
  console.log("Sign In triggered");
  const token = await AsyncStorage.getItem("@accessToken");
  console.log("The retrieved token is: " + token);
  if (!token) {
    console.log("calling prompt async");
    try {
      state.isLoading = true;
      await promptAsync();
    } catch (error) {
      throw new Error(
        "Google threw an authentication error while trying to sign in"
      );
    }
  } else {
    console.log("calling dispatch with signIn");
    dispatch({ type: "SIGN_IN", token: token });
  }
}

async function signOutLogic(dispatch) {
  console.log("Sign Out triggered");
  await AsyncStorage.removeItem("@accessToken");
  dispatch({ type: "SIGN_OUT" });
}

async function updateTodayLogic(dispatch, today) {
  console.log("update today triggered");
  await setToday(today);
  dispatch({ type: "UPDATE_TODAY", today: today });
}

async function updateFifoLogic(dispatch, fifo) {
  console.log("update today triggered");
  await setFifoArray(fifo);
  dispatch({ type: "UPDATE_FIFO", fifo: fifo });
}
