"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const class_transformer_1 = require("class-transformer");
const product_dto_1 = require("../../products/product.dto");
const product_service_1 = __importDefault(require("../../products/product.service"));
const priceHistory_dto_1 = require("../../price-history/priceHistory.dto");
const priceHistory_service_1 = __importDefault(require("../../price-history/priceHistory.service"));
class RobotController {
    constructor() {
        this.productService = product_service_1.default;
        this.priceHistoryService = priceHistory_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async robot(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const response = await this.productService.findProduct(query);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/robot/robot-control.ejs", {
                response,
                pageInfo: { pathUrl: "/panel/robot-control", pathTitle: "مدیریت ربات", query: { ...query, queryString } },
                apiUrl: process.env.API_URL,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async history(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(priceHistory_dto_1.PriceHistoryQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const response = await this.priceHistoryService.find(query);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/robot/robot-history.ejs", {
                response,
                pageInfo: { pathUrl: "/panel/robot-history", pathTitle: "تاریخچه تغییر قیمت", query: { ...query, queryString } },
                apiUrl: process.env.API_URL,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RobotController = RobotController;
