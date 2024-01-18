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
const product_model_1 = require("../products/product.model");
const mongoose_1 = __importDefault(require("mongoose"));
class BuyAndSellService {
    async create(reqDto) {
        reqDto.hour = (0, dateNormalize_1.getHourNow)();
        reqDto.date = (0, dateNormalize_1.getDateNow)();
        const buyAndSellDto = (0, class_transformer_1.plainToClass)(buy_sell_dto_1.CreateBuyAndSellDTO, reqDto, { excludeExtraneousValues: true });
        (0, error_handler_1.errorHandler)({ buyAndSellDto });
        const result = await buy_sell_model_1.BuyAndSellModel.create(buyAndSellDto);
        if (!result)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async buy(productID, buyAndSellDto, productDto) {
        const product = {
            product: productID.id,
            count: +(buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.count),
            operation: (buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.operation) || "خرید",
            status: "buy",
        };
        if (!!Number((buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.count) <= 0))
            throw http_errors_1.default.BadRequest("خرید محصول با خطا مواجه شد");
        await this.create(product);
        const countProduct = Number(productDto === null || productDto === void 0 ? void 0 : productDto.count) + Number(buyAndSellDto.count);
        await product_model_1.ProductModel.updateOne({ _id: productID.id }, {
            count: countProduct,
        });
    }
    async sell(productID, buyAndSellDto, productDto) {
        const product = {
            product: productID.id,
            count: +(buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.count),
            operation: (buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.operation) || "فروش",
            status: "sell",
        };
        if (!!Number((buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.count) <= 0))
            throw http_errors_1.default.BadRequest("فروش محصول با خطا مواجه شد");
        if (!!Number((buyAndSellDto === null || buyAndSellDto === void 0 ? void 0 : buyAndSellDto.count) > Number(productDto === null || productDto === void 0 ? void 0 : productDto.count)))
            throw http_errors_1.default.BadRequest("فروش محصول با خطا مواجه شد");
        await this.create(product);
        const countProduct = Number(productDto === null || productDto === void 0 ? void 0 : productDto.count) - Number(buyAndSellDto.count);
        await product_model_1.ProductModel.updateOne({ _id: productID.id }, {
            count: countProduct,
        });
    }
    async reportSell(productID) {
        (0, error_handler_1.errorHandler)({ productID });
        const result = await buy_sell_model_1.BuyAndSellModel.find({ product: productID.id, status: "sell", operation: { $ne: "خرابی" } })
            .limit(12)
            .sort({ createdAt: -1 });
        return result;
    }
    async reportBuy(productID) {
        (0, error_handler_1.errorHandler)({ productID });
        const result = await buy_sell_model_1.BuyAndSellModel.find({ product: productID.id, status: "buy", operation: { $ne: "خرابی" } })
            .limit(12)
            .sort({ createdAt: -1 });
        return result;
    }
    async sumCountAllAndMonthBuyOrSell(productID, status) {
        const result = await buy_sell_model_1.BuyAndSellModel.aggregate([
            { $match: { product: new mongoose_1.default.Types.ObjectId(productID.toString()), operation: { $ne: "خرابی" }, status } },
            { $group: { _id: "", sumCountAll: { $sum: "$count" }, products: { $push: "$$ROOT" } } },
            { $unwind: { path: "$products" } },
            { $match: { "products.createdAt": { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } } },
            { $sort: { "products.createdAt": -1 } },
            { $group: { _id: "", sumCountMonth: { $sum: "$products.count" }, sumCountAll: { $first: "$sumCountAll" }, lastOperation: { $first: "$products" } } },
            { $project: { _id: 0 } },
        ]).then((items) => items[0]);
        return result;
    }
}
exports.default = new BuyAndSellService();
// update Date
// const result = await BuyAndSellModel.find({}).lean();
// for (const product of result) {
//   await BuyAndSellModel.updateOne(
//     { _id: product._id },
//     {
//       $set: {
//         createdAt: new Date(moment.from(product.date, "fa", "YYYY/MM/DD").format("YYYY/MM/DD")),
//       },
//     }
//   );
// }
