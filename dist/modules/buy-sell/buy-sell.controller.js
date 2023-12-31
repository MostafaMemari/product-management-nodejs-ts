"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAndSellController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const buy_sell_service_1 = __importDefault(require("./buy-sell.service"));
const buy_sell_dto_1 = require("./buy-sell.dto");
const class_transformer_1 = require("class-transformer");
const http_status_codes_1 = require("http-status-codes");
const buy_sell_message_1 = require("./buy-sell.message");
const public_types_1 = require("../../types/public.types");
const product_service_1 = __importDefault(require("../product/product.service"));
class BuyAndSellController {
    constructor() {
        this.service = buy_sell_service_1.default;
        this.productService = product_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async create(req, res, next) {
        try {
            await this.service.create(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                statusCode: http_status_codes_1.StatusCodes.CREATED,
                message: buy_sell_message_1.BuyAndSellMessage.Successfully,
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async buyAndSell(req, res, next) {
        try {
            const pathUrl = req.url.split("/").pop();
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
            const countDto = (0, class_transformer_1.plainToClass)(buy_sell_dto_1.CountDTO, req.body, { excludeExtraneousValues: true });
            const productDto = await this.productService.checkExistProduct(productID);
            if (pathUrl === "buy") {
                await this.service.buy(productID, countDto, productDto);
            }
            else if (pathUrl === "sell") {
                await this.service.sell(productID, countDto, productDto);
            }
            else if (pathUrl === "depo") {
                await this.service.depo(productID, countDto, productDto);
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: buy_sell_message_1.BuyAndSellMessage.Buy,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BuyAndSellController = BuyAndSellController;
