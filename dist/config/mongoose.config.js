"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectMongoDB(DB_URL) {
    console.log(DB_URL);
    mongoose_1.default
        .connect(`${DB_URL}`)
        .then(() => console.log("connected to DB!"))
        .catch((err) => console.log(err.message));
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("mongoose connection is disconnected");
    });
    process.on("SIGINT", async () => {
        await mongoose_1.default.connection.close();
        console.log("disconnected");
        process.exit(0);
    });
}
exports.connectMongoDB = connectMongoDB;
