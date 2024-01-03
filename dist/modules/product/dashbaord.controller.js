"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_dto_1 = require("./product.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const dashbaord_service_1 = __importDefault(require("./dashbaord.service"));
const product_message_1 = require("./product.message");
const auto_bind_1 = __importDefault(require("auto-bind"));
const public_types_1 = require("../../types/public.types");
const color_service_1 = __importDefault(require("../color/color.service"));
const category_service_1 = __importDefault(require("../category/category.service"));
class ProductController {
    constructor() {
        this.service = dashbaord_service_1.default;
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            const productDto = (0, class_transformer_1.plainToClass)(product_dto_1.ProductDTO, req.body, { excludeExtraneousValues: true });
            await this.service.create(productDto);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                message: product_message_1.ProductMessage.Created,
            });
        }
        catch (error) {
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
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const response = await this.service.find(query, colors, categories);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: response,
            });
        }
        catch (error) {
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
            next(error);
        }
    }
    async dashboard(req, res, next) {
        try {
            res.render("index");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
