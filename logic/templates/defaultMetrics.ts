import { getToday } from "../dates/dates";

export const todayDataTemplate = () => {
  return {
    date: getToday(),
    chatarra: null,
  };
};
