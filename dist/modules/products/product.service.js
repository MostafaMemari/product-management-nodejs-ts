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
    async find(query, colorsDto, categoryDto) {
        var _a, _b;
        const page = parseInt(query.page) - 1 || 0;
        const limit = parseInt(query.limit) || 40;
        const search = query.search || "";
        const sort = query.sort == "asc" ? "asc" : "desc" || "desc";
        let categories = ((_a = query === null || query === void 0 ? void 0 : query.category) === null || _a === void 0 ? void 0 : _a.split(",")) || "ALL";
        let colors = ((_b = query === null || query === void 0 ? void 0 : query.color) === null || _b === void 0 ? void 0 : _b.split(",")) || "ALL";
        colors === "ALL"
            ? (colors = colorsDto.map((color) => String(color._id)))
            : (colors = colorsDto.filter((color) => colors.includes(color.name)).map((id) => String(id._id)));
        categories === "ALL"
            ? (categories = categoryDto.map((category) => String(category._id)))
            : (categories = categoryDto.filter((category) => categories.includes(category.name)).map((id) => String(id._id)));
        const products = await product_model_1.ProductModel.find({ title: { $regex: search, $options: "i" } })
            .where("category")
            .in(categories)
            .where("color")
            .in(colors)
            .skip(page * limit)
            .limit(limit)
            .sort({ updatedAt: sort == "asc" ? 1 : -1 })
            .populate("color")
            .populate("category");
        const total = await product_model_1.ProductModel.countDocuments({
            category: { $in: [...categories] },
            color: { $in: [...colors] },
            title: { $regex: search, $options: "i" },
        });
        const response = {
            total,
            pages: Math.ceil(total / limit),
            page: page + 1,
            limit,
            products,
        };
        return response;
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
