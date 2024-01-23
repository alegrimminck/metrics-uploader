import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getToday } from "../dates/dates";

export const postGoogleSheets = async (array, accessToken) => {
  if (!accessToken) {
    console.error("No access token found");
    return;
  }

  const today = await getToday();
  let data = { majorDimension: "ROWS", values: [...array] };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sheets.googleapis.com/v4/spreadsheets/12P5-URZO0SfO5-ebVALqgCohdaEhcjWeFkDgAzJmNwY/values/DATOS!A:A:append?valueInputOption=RAW",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return "success";
  } catch (error) {
    if (error.response) {
      return `Error: ${JSON.stringify(error.response.status)} - ${JSON.stringify(error.response.data)}`;
    }
    return "Error: An unexpected error occurred";
  }
};
