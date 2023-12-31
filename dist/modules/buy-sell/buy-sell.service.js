"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const buy_sell_dto_1 = require("./buy-sell.dto");
const buy_sell_model_1 = require("./buy-sell.model");
const class_transformer_1 = require("class-transformer");
const dateNormalize_1 = require("../../common/utils/dateNormalize");
const product_model_1 = require("../product/product.model");
class BuyAndSellService {
    async create(reqDto) {
        reqDto.hour = (0, dateNormalize_1.getHourNow)();
        reqDto.date = (0, dateNormalize_1.getDateNow)();
        const buyAndSellDto = (0, class_transformer_1.plainToClass)(buy_sell_dto_1.BuyAndSellDTO, reqDto, { excludeExtraneousValues: true });
        (0, error_handler_1.errorHandler)({ buyAndSellDto });
        const result = await buy_sell_model_1.BuyAndSellModel.create(buyAndSellDto);
        if (!result)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async buy(productID, count, productDto) {
        const productDTO = { product: productID.id, count: +count.count, operation: "خرید" };
        await this.create(productDTO);
        const countProduct = Number(productDto === null || productDto === void 0 ? void 0 : productDto.count) + Number(count.count);
        await product_model_1.ProductModel.updateOne({ _id: productID.id }, {
            count: countProduct,
        });
    }
    async sell(productID, count, productDto) {
        const productDTO = { product: productID.id, count: +count.count, operation: "فروش" };
        await this.create(productDTO);
        const countProduct = Number(productDto === null || productDto === void 0 ? void 0 : productDto.count) - Number(count.count);
        await product_model_1.ProductModel.updateOne({ _id: productID.id }, {
            count: countProduct,
        });
    }
    async depo(productID, count, productDto) {
        const productDTO = { product: productID.id, count: +count.count, operation: "دپو" };
        await this.create(productDTO);
        const countProduct = Number(productDto === null || productDto === void 0 ? void 0 : productDto.count) - Number(count.count);
        await product_model_1.ProductModel.updateOne({ _id: productID.id }, {
            count: countProduct,
        });
    }
}
exports.default = new BuyAndSellService();
