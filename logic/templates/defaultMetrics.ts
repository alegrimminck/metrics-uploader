import { getToday } from "../dates/dates";

export const todayDataTemplate = async () => {
  const today = await getToday();
  return {
    date: today,
    chatarra: null,
  };
};
