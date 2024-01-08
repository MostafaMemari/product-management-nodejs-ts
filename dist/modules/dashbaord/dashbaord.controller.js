"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbaordController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const class_transformer_1 = require("class-transformer");
const product_dto_1 = require("../products/product.dto");
const color_service_1 = __importDefault(require("../color/color.service"));
const category_service_1 = __importDefault(require("../category/category.service"));
const product_service_1 = __importDefault(require("../products/product.service"));
const seller_service_1 = __importDefault(require("../seller/seller.service"));
class DashbaordController {
    constructor() {
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        this.productService = product_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async main(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const response = await this.productService.find(query, colors, categories);
            res.render("./pages/panel/index.ejs", { response, colors, categories });
        }
        catch (error) {
            next(error);
        }
    }
    async buy(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const response = await this.productService.find(query, colors, categories);
            res.render("./pages/panel/buy.ejs", { response, colors, categories });
        }
        catch (error) {
            next(error);
        }
    }
    async sell(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const response = await this.productService.find(query, colors, categories);
            res.render("./pages/panel/sell.ejs", { response, colors, categories });
        }
        catch (error) {
            next(error);
        }
    }
    async products(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, colors, categories);
            res.render("./pages/panel/products.ejs", { response, colors, categories, sellers });
        }
        catch (error) {
            next(error);
        }
    }
    async robot(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const response = await this.productService.find(query, colors, categories);
            res.render("./pages/panel/robot.ejs", { response, colors, categories });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DashbaordController = DashbaordController;
