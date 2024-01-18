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
const product_service_1 = __importDefault(require("../products/product.service"));
class BuyAndSellController {
    constructor() {
        this.service = buy_sell_service_1.default;
        this.productService = product_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async buy(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const buyAndSellDto = (0, class_transformer_1.plainToClass)(buy_sell_dto_1.BuyAndSellDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const productDto = await this.productService.checkExistProduct(productID);
            await this.service.buy(productID, buyAndSellDto, productDto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: buy_sell_message_1.BuyAndSellMessage.Buy,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sell(req, res, next) {
        try {
            const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const buyAndSellDto = (0, class_transformer_1.plainToClass)(buy_sell_dto_1.BuyAndSellDTO, req.body, {
                excludeExtraneousValues: true,
                exposeUnsetFields: false,
            });
            const productDto = await this.productService.checkExistProduct(productID);
            await this.service.sell(productID, buyAndSellDto, productDto);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: buy_sell_message_1.BuyAndSellMessage.Sell,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async reportBuy(req, res, next) {
        const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
        const reportBuyProduct = await this.service.reportBuy(productID);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: reportBuyProduct,
        });
    }
    async reportSell(req, res, next) {
        const productID = (0, class_transformer_1.plainToClass)(public_types_1.ObjectIdDTO, req.params, { excludeExtraneousValues: true });
        const reportSellProduct = await this.service.reportSell(productID);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            data: reportSellProduct,
        });
    }
}
exports.BuyAndSellController = BuyAndSellController;
