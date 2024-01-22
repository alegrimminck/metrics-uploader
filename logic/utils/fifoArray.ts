import moment from "moment";
import { getFifoArray, setFifoArray } from ".";
import { getToday } from "../dates/dates";
import { todayDataTemplate } from "../templates/defaultMetrics";

export const pushToFifoArray = async (data) => {
  const fifoArray = await getFifoArray();

  fifoArray.unshift(data);
  await setFifoArray(fifoArray);
};

export const pushUnhandledDays = async (data) => {
  const lastDay = moment(data.date);
  const today = await getToday();

  const difference = today.diff(lastDay, "days");
  if (difference > 1) {
    for (let i = 1; i < difference; i++) {
      const date = lastDay.clone().add(i, "days");
      const template = await todayDataTemplate();
      const data = {
        ...template,
        date,
      };

      await pushToFifoArray(data);
    }
  }
};
