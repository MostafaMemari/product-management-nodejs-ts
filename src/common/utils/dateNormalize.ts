import { toEnglish } from "./functions";

export function getHourNow() {
  let currentHour: string = String(new Date().getHours());
  let currentMinute: string = String(new Date().getMinutes());

  currentHour = currentHour.length == 1 ? `0${currentHour}` : currentHour;
  currentMinute = currentMinute.length == 1 ? `0${currentMinute}` : currentMinute;

  return `${currentHour}:${currentMinute}`;
}
export function getDateNow() {
  let dateShamsi: string = toEnglish(new Date().toLocaleDateString("fa-IR"));

  let [year, month, day] = dateShamsi.split("/");
  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;

  return `${year}/${month}/${day}`;
}
