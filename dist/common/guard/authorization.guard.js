"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const auth_message_1 = require("../messages/auth.message");
const functions_1 = require("../utils/functions");
const auth_model_1 = require("../../modules/auth/auth.model");
async function Authorization(req, res, next) {
    var _a;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token)
            throw http_errors_1.default.Unauthorized(auth_message_1.AuthorizationMessage.Login);
        const data = await (0, functions_1.verifyToken)(token);
        if (typeof data === "object" && "id" in data) {
            const user = await auth_model_1.UserModel.findById(data.id).select("-password").lean();
            if (!user)
                throw http_errors_1.default.Unauthorized(auth_message_1.AuthorizationMessage.NotFoundAccount);
            if (user.role === "SUPER_ADMIN") {
                req.user = user;
                return next();
            }
            else {
                throw next(http_errors_1.default.Unauthorized(auth_message_1.AuthorizationMessage.UnAuthorized));
            }
        }
        throw http_errors_1.default.Unauthorized(auth_message_1.AuthorizationMessage.InvalidToken);
    }
    catch (error) {
        // res.redirect("/auth/register");
        next(error);
    }
}
exports.Authorization = Authorization;
