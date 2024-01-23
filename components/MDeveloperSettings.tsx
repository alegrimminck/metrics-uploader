import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import MButton from "./MButton";
import moment from "moment";
import { handleResetToFirstTimeOpen } from "../logic/utils";
import {
  getDataDeveloper,
  getFifoArrayDeveloper,
} from "../logic/utils/developer";
import { getToday } from "../logic/dates/dates";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../logic/authentication/authContext";

const MDeveloperSettings = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [todayDev, setTodayDev] = useState(moment());

  const { today, updateToday, fifo, updateFifo } = useContext(AuthContext);

  const handleMinusOneDay = async () => {
    const yesterday = moment(today).subtract(1, "days");
    updateToday(yesterday);
    setTodayDev(yesterday);
  };

  const handlePlusOneDay = async () => {
    const tomorrow = moment(today).add(1, "days");
    updateToday(tomorrow);
    setTodayDev(tomorrow);
  };

  const handleGoBack = () => {
    navigation.navigate("MMainPage");
  };

  const handleResetAll = async () => {
    await handleResetToFirstTimeOpen(updateFifo);
    await getDataPromise();
    await getFifoArrayPromise();
  };

  async function getDataPromise() {
    const data = await getDataDeveloper();
    setData(data);
  }

  async function getFifoArrayPromise() {
    const fifoArray = await getFifoArrayDeveloper();
    await updateFifo(fifoArray);
  }

  useEffect(() => {
    getDataPromise();
    getFifoArrayPromise();
  }, []);

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

      <View>
        <Text>Data is: {JSON.stringify(data)}</Text>
        <Text>FifoArray is: {JSON.stringify(fifo)}</Text>
      </View>
      <View>
        <Button
          title="Reset all values except token"
          onPress={handleResetAll}
        />
      </View>
    </View>
  );
};

export default MDeveloperSettings;
