"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const category_model_1 = require("./category.model");
const category_message_1 = require("./category.message");
const product_model_1 = require("../products/product.model");
class CategorySevice {
    async create(categoryDto) {
        (0, error_handler_1.errorHandler)({ categoryDto });
        const category = await category_model_1.CategoryModel.create(categoryDto);
        return category;
    }
    async update(categoryID, categoryDto) {
        (0, error_handler_1.errorHandler)({ categoryID, categoryDto });
        await this.checkExistCategory(categoryID);
        const result = await category_model_1.CategoryModel.updateOne({ _id: categoryID.id }, { ...categoryDto });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async findByID(categoryID) {
        (0, error_handler_1.errorHandler)({ categoryID });
        return await this.checkExistCategory(categoryID);
    }
    async find() {
        const category = await category_model_1.CategoryModel.find({}).lean();
        return category;
    }
    async removeByID(categoryID) {
        (0, error_handler_1.errorHandler)({ categoryID });
        const category = await this.checkExistCategory(categoryID);
        const deleteCategory = await category_model_1.CategoryModel.deleteOne({ _id: category === null || category === void 0 ? void 0 : category.id });
        if (!deleteCategory.deletedCount)
            throw http_errors_1.default.InternalServerError();
        await product_model_1.ProductModel.updateMany({ category: categoryID.id }, { $unset: { category: "" } });
        return true;
    }
    async checkExistCategory(CategoryID) {
        const Category = await category_model_1.CategoryModel.findById(CategoryID.id);
        if (!Category)
            throw http_errors_1.default.NotFound(category_message_1.CategoryMessage.NotFound);
        return Category;
    }
}
exports.default = new CategorySevice();
