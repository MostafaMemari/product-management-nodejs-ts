import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    if (!isNaN(objectString[i])) objectString[i] = Number(objectString[i]);
    if (objectString[i] === "undefined") delete objectString[i];
    if (!objectString[i]) delete objectString[i];
    if (objectString[i] === "none") delete objectString[i];
  }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
export async function comparePassword(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}
export async function generateToken(payload: object) {
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "7d" });
}
export async function verifyToken(token: string) {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
}
