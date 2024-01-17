import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const postGoogleSheets = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(`accessToken: ${accessToken}`)
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const sheetId = '12P5-URZO0SfO5-ebVALqgCohdaEhcjWeFkDgAzJmNwY';
    const range = 'DATOS!A:A';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`;

    const body = {
      majorDimension: "ROWS",
      values: [
        ["2023-12-12", "Valor desde Android!!!"]
      ]
    };

    let data = {"majorDimension": "ROWS",  "values": [["2023-03-01","Lo logre de ANDROOIDDD"]]};

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sheets.googleapis.com/v4/spreadsheets/12P5-URZO0SfO5-ebVALqgCohdaEhcjWeFkDgAzJmNwY/values/DATOS!A:A:append?valueInputOption=RAW',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + accessToken
      },
      data : JSON.stringify(data)
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
    });

  };