import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MTextInput from "./MTextInput";
import colors from "../constants/colors";
import MButton from "./MButton";
import { postGoogleSheets } from "../logic/requests/postGoogleSheets";
import { AuthContext } from "../logic/authentication/authContext";
import { getUserName } from "../logic/authentication/getUserInfo";

const MMainPage = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { userToken, today } = useContext(AuthContext);

  const handleInputChange = (text) => {
    setInputValue(text);
    setIsButtonDisabled(text.length === 0);
  };

  const handleSaveValuesPress = async () => {
    setInputValue("");
    setIsButtonDisabled(true);
    await postGoogleSheets(today, inputValue, userToken);
  };

  useEffect(() => {
    async function getUsername() {
      const username = await getUserName(userToken);
      setUsername(username);
    }
    getUsername();
  }, []);

  const { signOut } = useContext(AuthContext);

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
        placeholder="value to upload"
      />
      <MButton
        type="primary"
        text="Send"
        onPress={handleSaveValuesPress}
        disabled={isButtonDisabled}
      />

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
