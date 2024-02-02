"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllerEJS = exports.ProductController = void 0;
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const auto_bind_1 = __importDefault(require("auto-bind"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const robot_dto_1 = require("./robot.dto");
const product_service_1 = __importDefault(require("./product.service"));
const robot_message_1 = require("./robot.message");
const public_types_1 = require("../../types/public.types");
const color_service_1 = __importDefault(require("../color/color.service"));
const category_service_1 = __importDefault(require("../category/category.service"));
const functions_1 = require("../../common/utils/functions");
const seller_service_1 = __importDefault(require("../seller/seller.service"));
class ProductController {
    constructor() {
        this.service = product_service_1.default;
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            (0, functions_1.stringToNumber)(req.body);
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
            productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
            productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;
            await this.service.create(productDto, req.file);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: http_status_codes_1.StatusCodes.CREATED,
                message: robot_message_1.ProductMessage.Created,
            });
        }
        catch (error) {
            req.body.imgUrl ? fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "public", req.body.imgUrl)) : next(error);
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            (0, functions_1.stringToNumber)(req.body);
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductUpdateDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
            productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
            productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;
            await this.service.update(productID, productDto, req.file);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: robot_message_1.ProductMessage.Updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateRobot(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductRobotDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            await this.service.updateRobot(productID, productDto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: robot_message_1.ProductMessage.Updated,
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
            const query = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.service.find(query, colors, categories, sellers);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async defects(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const response = await this.service.defects(query);
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
                message: robot_message_1.ProductMessage.Deleted,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
class ProductControllerEJS {
    constructor() {
        this.service = product_service_1.default;
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            (0, functions_1.stringToNumber)(req.body);
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
            productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
            productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;
            await this.service.create(productDto, req.file);
            req.flash("success", robot_message_1.ProductMessage.Created);
            res.redirect("/panel/products");
        }
        catch (error) {
            req.flash("error", robot_message_1.ProductMessage.ErrorCreate);
            res.redirect("/panel/products");
            // next(error);
        }
    }
    async update(req, res, next) {
        try {
            (0, functions_1.stringToNumber)(req.body);
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductUpdateDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            productDto.color ? await this.colorService.checkExistColor({ id: productDto.color }) : false;
            productDto.category ? await this.categoryService.checkExistCategory({ id: productDto.category }) : false;
            productDto.seller ? await this.sellerService.checkExistSeller({ id: productDto.seller }) : false;
            await this.service.update(productID, productDto, req.file);
            req.flash("success", robot_message_1.ProductMessage.Updated);
            res.redirect("/panel/products");
        }
        catch (error) {
            req.flash("error", robot_message_1.ProductMessage.ErrorUpdate);
            res.redirect("/panel/products");
            // next(error);
        }
    }
    async updateRobot(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const productDto = (0, class_transformer_1.plainToClass)(robot_dto_1.ProductRobotDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            await this.service.updateRobot(productID, productDto);
            req.flash("success", robot_message_1.ProductMessage.Updated);
            res.redirect("/panel/robot");
        }
        catch (error) {
            req.flash("error", robot_message_1.ProductMessage.ErrorUpdate);
            res.redirect("/panel/products");
            // next(error);
        }
    }
}
exports.ProductControllerEJS = ProductControllerEJS;
