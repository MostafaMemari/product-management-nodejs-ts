"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = exports.stringToNumber = exports.toEnglish = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
function stringToNumber(objectString) {
    for (const i in objectString) {
        if (!isNaN(objectString[i]))
            objectString[i] = Number(objectString[i]);
        if (objectString[i] === "undefined")
            delete objectString[i];
        if (!objectString[i])
            delete objectString[i];
        if (objectString[i] === "none")
            delete objectString[i];
    }
}
exports.stringToNumber = stringToNumber;
async function hashPassword(password) {
    return await bcrypt_1.default.hash(password, 10);
}
exports.hashPassword = hashPassword;
async function comparePassword(password, hashPassword) {
    return await bcrypt_1.default.compare(password, hashPassword);
}
exports.comparePassword = comparePassword;
async function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "7d" });
}
exports.generateToken = generateToken;
async function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
}
exports.verifyToken = verifyToken;
