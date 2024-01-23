import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MTextInput from "./MTextInput";
import colors from "../constants/colors";
import MButton from "./MButton";
import { postGoogleSheets } from "../logic/requests/postGoogleSheets";
import { AuthContext } from "../logic/authentication/authContext";
import { getUserName } from "../logic/authentication/getUserInfo";
import { firstTimeOpenInitialization } from "../logic/first_initialization/firstTimeOpenInitialization";
import { useFocusEffect } from "@react-navigation/native";
import { hasPassedAtLeastOneDay } from "../logic/dates/dates";
import {
  pushToFifoArray,
  pushUnhandledDays,
  sendFifoArray,
} from "../logic/utils/fifoArray";
import {
  getData,
  getFifoArray,
  setData,
  updateDataMetric,
} from "../logic/utils";
import moment from "moment";

const MMainPage = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [sendedData, setSendedData] = useState("");
  const { userToken, signOut, today, fifo, updateFifo } =
    useContext(AuthContext);

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsButtonDisabled(text.length === 0);
  };

  const handleSaveValuesPress = async () => {
    updateDataMetric(inputValue);
    setInputValue("");
    setIsButtonDisabled(true);
  };

  const handleSendValuesPress = async () => {
    const response = await sendFifoArray(userToken, updateFifo);
    if (response === "success") {
      setSendedData("SUCCESS");
    } else {
      setSendedData(response);
    }
  };

  useEffect(() => {
    async function getUsername() {
      const username = await getUserName(userToken);
      setUsername(username);
    }

    getUsername();
  }, []);

  async function addFifoPendingsAndRewriteData() {
    const hasPassed = await hasPassedAtLeastOneDay(today);
    if (!hasPassed) return;

    const data = await getData();

    await pushToFifoArray(data);
    await pushUnhandledDays(data);
    await setData();
  }

  useFocusEffect(() => {
    firstTimeOpenInitialization();
    addFifoPendingsAndRewriteData();
  });

  const handleDevMode = () => {
    navigation.navigate("MDeveloperSettings");
  };

  return (
    <View style={styles.container}>
      <MButton type="primary" text="Logout" onPress={() => signOut()} />
      <Text style={styles.title}>Metrics Uploader</Text>
      {username && <Text style={styles.description}>Hi {username}!</Text>}
      <Text style={styles.subtitle}>Save your values</Text>

      <View style={styles.todaySection}>
        <Text style={styles.description}>
          Today is: {today.format("DD/MM/YYYY")}
        </Text>
      </View>

      <MTextInput
        onChangeText={handleInputChange}
        placeholder="value to save"
      />
      <MButton
        type="primary"
        text="Save"
        onPress={handleSaveValuesPress}
        disabled={isButtonDisabled}
      />

      <MButton
        type="primary"
        text="Send"
        onPress={handleSendValuesPress}
        disabled={fifo.length === 0}
      />
      {sendedData && (
        <View>
          <Text style={styles.description}>{sendedData}</Text>
          <MButton
            type="primary"
            text="Close"
            onPress={() => setSendedData("")}
          />
        </View>
      )}
      {fifo.length !== 0 && (
        <Text style={styles.description}>
          You can send these values:{"\n"}
          {JSON.stringify(fifo)}
        </Text>
      )}

      <View style={styles.developmentWrapper}>
        <View style={styles.buttonRow}>
          <Button title="Dev mode" onPress={() => handleDevMode()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "normal",
    color: colors.primary,
    marginBottom: 40,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
  },
  spacer: {
    width: 20,
  },
  todaySection: {
    width: "100%",
  },
  goBack: {
    width: 20,
  },
  information: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  developmentWrapper: {
    flex: 1,

    width: "100%",
  },
});

export default MMainPage;
