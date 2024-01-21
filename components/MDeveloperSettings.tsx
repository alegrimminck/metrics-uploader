import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import MButton from "./MButton";
import moment from "moment";
import { AuthContext } from "../logic/authentication/authContext";

const MDeveloperSettings = ({ navigation }) => {
  const { today, updateToday } = useContext(AuthContext);

  const handleMinusOneDay = () => {
    const yesterday = moment(today).subtract(1, "days");
    updateToday(yesterday);
  };

  const handlePlusOneDay = () => {
    const tomorrow = moment(today).add(1, "days");
    updateToday(tomorrow);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <MButton type="primary" text="Go Back" onPress={() => handleGoBack()} />

      <View>
        <Text>Today is: {today.format("DD/MM/YYYY")}</Text>
      </View>

      <View>
        <Button title="-1 day" onPress={() => handleMinusOneDay()} />
        <Button title="+1 day" onPress={() => handlePlusOneDay()} />
      </View>
    </View>
  );
};

export default MDeveloperSettings;
