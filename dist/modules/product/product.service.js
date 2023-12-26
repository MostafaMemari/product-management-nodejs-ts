"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = require("../../common/exception/error.handler");
const product_model_1 = require("./product.model");
class ProductService {
    async create(productDto) {
        (0, error_handler_1.errorHandler)(productDto);
        const product = await product_model_1.ProductModel.create(productDto);
        return product;
    }
    async getProduct(productIdDto) {
        // errorHandler(productIdDto);
        console.log(productIdDto);
        const product = await product_model_1.ProductModel.findById(productIdDto.id);
        return product;
    }
}
exports.default = new ProductService();
