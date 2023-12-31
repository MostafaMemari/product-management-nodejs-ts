"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateNow = exports.getHourNow = void 0;
const functions_1 = require("./functions");
function getHourNow() {
    let currentHour = String(new Date().getHours());
    let currentMinute = String(new Date().getMinutes());
    currentHour = currentHour.length == 1 ? `0${currentHour}` : currentHour;
    currentMinute = currentMinute.length == 1 ? `0${currentMinute}` : currentMinute;
    return `${currentHour}:${currentMinute}`;
}
exports.getHourNow = getHourNow;
function getDateNow() {
    let dateShamsi = (0, functions_1.toEnglish)(new Date().toLocaleDateString("fa-IR"));
    let [year, month, day] = dateShamsi.split("/");
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
    return `${year}/${month}/${day}`;
}
exports.getDateNow = getDateNow;
