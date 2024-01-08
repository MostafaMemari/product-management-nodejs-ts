"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const seller_dto_1 = require("./seller.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const seller_service_1 = __importDefault(require("./seller.service"));
const seller_message_1 = require("./seller.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const public_types_1 = require("../../types/public.types");
class SellerController {
    constructor() {
        this.service = seller_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            const { isRobot, sellerID } = req.body;
            req.body.isRobot = isRobot === "on" ? true : false;
            req.body.sellerID = Number(sellerID);
            const sellerDto = (0, class_transformer_1.plainToClass)(seller_dto_1.SellerDTO, req.body, { excludeExtraneousValues: true });
            await this.service.create(sellerDto);
            req.flash("success", "ثبت دسته بندی انجام شد");
            // res.redirect("/panel/products");
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                message: seller_message_1.SellerMessage.Created,
            });
        }
        catch (error) {
            // req.flash("error", "ثبت دسته بندی با خطا مواجه شد");
            // res.redirect("/panel/products");
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const sellerID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const sellerDto = (0, class_transformer_1.plainToClass)(seller_dto_1.SellerUpdateDTO, req.body, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
            });
            await this.service.update(sellerID, sellerDto);
            req.flash("success", "بروزرسانی فروشنده انجام شد");
            res.redirect("/panel/products");
            // res.status(StatusCodes.OK).json({
            //   message: SellerMessage.Updated,
            // });
        }
        catch (error) {
            req.flash("error", "ویرایش دسته بندی با خطا مواجه شد");
            res.redirect("/panel/products");
            next(error);
        }
    }
    async findByID(req, res, next) {
        try {
            const sellerID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const seller = await this.service.findByID(sellerID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { seller },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const sellers = await this.service.find();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { sellers },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async removeByID(req, res, next) {
        try {
            console.log(req.params);
            const sellerID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            await this.service.removeByID(sellerID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: seller_message_1.SellerMessage.Deleted,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SellerController = SellerController;
