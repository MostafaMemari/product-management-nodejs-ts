"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
const color_dto_1 = require("./color.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const color_service_1 = __importDefault(require("./color.service"));
const color_message_1 = require("./color.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const public_types_1 = require("../../types/public.types");
class ColorController {
    constructor() {
        this.service = color_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            const colorDto = (0, class_transformer_1.plainToClass)(color_dto_1.ColorDTO, req.body, { excludeExtraneousValues: true });
            await this.service.create(colorDto);
            req.flash("success", "ثبت رنگ با موفقیت انجام شد");
            res.redirect("/panel/products");
            // res.status(StatusCodes.CREATED).json({
            //   statusCode: StatusCodes.CREATED,
            //   message: ColorMessage.Created,
            // });
        }
        catch (error) {
            req.flash("error", "ثبت رنگ با خطا مواجه شد");
            res.redirect("/panel/products");
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const colorID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colorDto = (0, class_transformer_1.plainToClass)(color_dto_1.ColorUpdateDTO, req.body, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
            });
            await this.service.update(colorID, colorDto);
            req.flash("success", "بروزرسانی رنگ با موفقیت انجام شد");
            res.redirect("/panel/products");
            // res.status(StatusCodes.OK).json({
            //   message: ColorMessage.Updated,
            // });
        }
        catch (error) {
            req.flash("error", "بروزرسانی رنگ با خطا مواجه شد");
            res.redirect("/panel/products");
            next(error);
        }
    }
    async findByID(req, res, next) {
        try {
            const colorID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const color = await this.service.findByID(colorID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { color },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const colors = await this.service.find();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { colors },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async removeByID(req, res, next) {
        try {
            const colorID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            await this.service.removeByID(colorID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: color_message_1.ColorMessage.Deleted,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.ColorController = ColorController;
