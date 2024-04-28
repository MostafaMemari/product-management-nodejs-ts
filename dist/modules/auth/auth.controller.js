"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_message_1 = require("./auth.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_dto_1 = require("./auth.dto");
const class_transformer_1 = require("class-transformer");
const public_enum_1 = require("../../common/constant/public.enum");
const env_enum_1 = require("../../common/constant/env.enum");
class AuthController {
    constructor() {
        this.service = auth_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async register(req, res, next) {
        try {
            const userDto = (0, class_transformer_1.plainToClass)(auth_dto_1.UserDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const token = await this.service.register(userDto);
            res
                .cookie(public_enum_1.CookieNames.AccessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === env_enum_1.NodeEnv.Development, // production => true
            })
                .status(http_status_codes_1.StatusCodes.OK)
                .json({
                status: http_status_codes_1.StatusCodes.OK,
                message: auth_message_1.AuthMessage.Register,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const userDto = (0, class_transformer_1.plainToClass)(auth_dto_1.UserLoginDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const accessToken = await this.service.login(userDto);
            res
                .cookie(public_enum_1.CookieNames.AccessToken, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === env_enum_1.NodeEnv.Development, // production => true
            })
                .status(http_status_codes_1.StatusCodes.OK)
                .json({
                status: http_status_codes_1.StatusCodes.OK,
                message: auth_message_1.AuthMessage.Login,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            res.clearCookie(public_enum_1.CookieNames.AccessToken);
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            res.status(200).json({
                user: req.user,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
