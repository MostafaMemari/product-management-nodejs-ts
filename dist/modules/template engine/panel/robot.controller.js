"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const class_transformer_1 = require("class-transformer");
const product_dto_1 = require("../../products/product.dto");
const color_service_1 = __importDefault(require("../../color/color.service"));
const category_service_1 = __importDefault(require("../../category/category.service"));
const product_service_1 = __importDefault(require("../../products/product.service"));
const buy_sell_service_1 = __importDefault(require("../../buy-sell/buy-sell.service"));
const seller_service_1 = __importDefault(require("../../seller/seller.service"));
class RobotController {
    constructor() {
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        this.productService = product_service_1.default;
        this.buyAndSellService = buy_sell_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async robot(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, colors, categories, sellers);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/robot/robot-control.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/robot-control", pathTitle: "مدیریت ربات", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async history(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, colors, categories, sellers);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/robot/robot-control.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/robot-control", pathTitle: "مدیریت ربات", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RobotController = RobotController;
