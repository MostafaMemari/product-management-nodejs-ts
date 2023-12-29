"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEnglish = void 0;
function toEnglish(persianNumber) {
    const pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let cache = persianNumber;
    for (let i = 0; i < 10; i++) {
        let reg_fa = new RegExp(pn[i], "g");
        cache = cache.replace(reg_fa, en[i]);
    }
    return cache;
}
exports.toEnglish = toEnglish;
