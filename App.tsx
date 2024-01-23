import { ActivityIndicator, StyleSheet, View } from "react-native";
import MMainPage from "./components/MMainPage";
import { useEffect, useMemo, useReducer, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MLogin from "./components/MLogin";
import { AuthContext } from "./logic/authentication/authContext";
import * as Google from "expo-auth-session/providers/google";
import { reducer } from "./logic/globalState/reducer";
import { useAuthContext } from "./logic/hooks/useAuth";
import { useRestoreUserIfSavedToken } from "./logic/hooks/useRestoreUserIfSavedToken";
import { useHandleGoogleSignInResponse } from "./logic/hooks/useHandleGoogleSignInResponse";
import MDeveloperSettings from "./components/MDeveloperSettings";
import { getPossiblyFirstTimeToday } from "./logic/dates/dates";
import moment from "moment";

const Stack = createNativeStackNavigator();

const ANDROID_CLIENT_ID =
  "430190611129-ri6cfjsakts45imckl2cpa41elof0k1k.apps.googleusercontent.com";

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    today: moment().subtract(20, "days"),
    fifo: [],
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authContext = useAuthContext(state, dispatch, promptAsync);
  useHandleGoogleSignInResponse(dispatch, response);
  useRestoreUserIfSavedToken(dispatch, state);

  useEffect(() => {
    async function getToday() {
      const today = await getPossiblyFirstTimeToday();
      dispatch({ type: "UPDATE_TODAY", today: today });
    }

    getToday();
  }, []);

  if (state.isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!state.userToken ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MLogin" component={MLogin} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MMainPage" component={MMainPage} />
            <Stack.Screen
              name="MDeveloperSettings"
              component={MDeveloperSettings}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingRight: 20,
    paddingLeft: 20,
  },
  statusBar: {
    backgroundColor: "#5DB075",
  },
});
