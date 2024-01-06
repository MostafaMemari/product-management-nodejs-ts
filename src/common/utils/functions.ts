export function toEnglish(persianNumber: any): string {
  const pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let cache = persianNumber;
  for (let i = 0; i < 10; i++) {
    let reg_fa = new RegExp(pn[i], "g");
    cache = cache.replace(reg_fa, en[i]);
  }
  return cache;
}

export function stringToNumber(objectString: any) {
  for (const i in objectString) {
    if (!isNaN(objectString[i])) {
      objectString[i] = Number(objectString[i]);
    } else if (objectString[i] === "undefined") {
      delete objectString[i];
    }
  }
}
