"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const auth_model_1 = require("./auth.model");
const auth_message_1 = require("./auth.message");
const functions_1 = require("../../common/utils/functions");
class AuthSevice {
    async register(userDto) {
        (0, error_handler_1.errorHandler)({ userDto });
        const { password, confirmPassword, email, username } = userDto;
        const userExist = await auth_model_1.UserModel.findOne({ $or: [{ username }, { email }] });
        if (userExist)
            throw http_errors_1.default.Conflict(auth_message_1.AuthMessage.Conflict);
        if (password !== confirmPassword)
            throw http_errors_1.default.BadRequest(auth_message_1.AuthMessage.RepeatPassword);
        const countOfUsers = await auth_model_1.UserModel.countDocuments();
        const hashedPassword = await (0, functions_1.hashPassword)(password);
        const userCreate = await auth_model_1.UserModel.create({ ...userDto, role: countOfUsers > 0 ? "USER" : "SUPER_ADMIN", password: hashedPassword });
        const user = userCreate.toObject();
        Reflect.deleteProperty(user, "password");
        const accessToken = await (0, functions_1.generateToken)({ id: user._id });
        return accessToken;
    }
    async login(userDto) {
        (0, error_handler_1.errorHandler)({ userDto });
        const { password, identifier } = userDto;
        const userExist = await auth_model_1.UserModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!userExist)
            throw http_errors_1.default.Unauthorized(auth_message_1.AuthMessage.Unauthorized);
        const isPasswordValid = await (0, functions_1.comparePassword)(password, userExist.password);
        if (!isPasswordValid)
            throw http_errors_1.default.Unauthorized(auth_message_1.AuthMessage.Unauthorized);
        const accessToken = await (0, functions_1.generateToken)({ id: userExist._id });
        return accessToken;
    }
}
exports.default = new AuthSevice();
