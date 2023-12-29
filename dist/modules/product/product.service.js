"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const product_model_1 = require("./product.model");
const product_message_1 = require("./product.message");
class ProductService {
    async create(productDto) {
        (0, error_handler_1.errorHandler)({ productDto });
        const product = await product_model_1.ProductModel.create(productDto);
        return product;
    }
    async update(productID, productDto) {
        console.log({ productID, productDto });
        (0, error_handler_1.errorHandler)({ productID, productDto });
        await this.checkExistProduct(productID);
        const result = await product_model_1.ProductModel.updateOne({ _id: productID.id }, { ...productDto });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async findByID(productID) {
        (0, error_handler_1.errorHandler)({ productID });
        return await this.checkExistProduct(productID);
    }
    async find() {
        const product = await product_model_1.ProductModel.find({});
        return product;
    }
    async removeByID(productID) {
        (0, error_handler_1.errorHandler)({ productID });
        const product = await this.checkExistProduct(productID);
        const deletedProduct = await product_model_1.ProductModel.deleteOne({ _id: product === null || product === void 0 ? void 0 : product.id });
        if (!deletedProduct.deletedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async checkExistProduct(productID) {
        const product = await product_model_1.ProductModel.findById(productID.id);
        if (!product)
            throw http_errors_1.default.NotFound(product_message_1.ProductMessage.NotFound);
        return product;
    }
}
exports.default = new ProductService();
