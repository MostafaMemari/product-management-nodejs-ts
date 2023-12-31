"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_dto_1 = require("./product.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const product_service_1 = __importDefault(require("./product.service"));
const product_message_1 = require("./product.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const public_types_1 = require("../../types/public.types");
const buy_sell_service_1 = __importDefault(require("../../modules/buy-sell/buy-sell.service"));
class ProductController {
    constructor() {
        this.service = product_service_1.default;
        this.buyAndSellService = buy_sell_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            console.log(req.body);
            const productDto = (0, class_transformer_1.plainToClass)(product_dto_1.ProductDTO, req.body, { excludeExtraneousValues: true });
            await this.service.create(productDto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                message: product_message_1.ProductMessage.Created,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const productDto = (0, class_transformer_1.plainToClass)(product_dto_1.ProductUpdateDTO, req.body, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
            });
            await this.service.update(productID, productDto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: product_message_1.ProductMessage.Updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findByID(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const product = await this.service.findByID(productID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { product },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const products = await this.service.find();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: { products },
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async removeByID(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            await this.service.removeByID(productID);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: product_message_1.ProductMessage.Deleted,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.ProductController = ProductController;
