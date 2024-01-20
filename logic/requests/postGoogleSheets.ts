import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const postGoogleSheets = async (momentDate, value, accessToken) => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const formattedDate = momentDate.format('YYYY-MM-DD');
    let data = {"majorDimension": "ROWS",  "values": [[formattedDate, value]]};

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