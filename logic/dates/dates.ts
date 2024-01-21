import moment from "moment-timezone";

export const getToday = () => {
  return moment().tz("America/Santiago");
};
