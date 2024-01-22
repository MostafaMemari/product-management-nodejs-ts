"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const color_model_1 = require("./color.model");
const color_message_1 = require("./color.message");
const product_model_1 = require("../products/product.model");
class ColorService {
    async create(colorDto) {
        (0, error_handler_1.errorHandler)({ colorDto });
        const color = await color_model_1.ColorModel.create(colorDto);
        return color;
    }
    async update(colorID, colorDto) {
        (0, error_handler_1.errorHandler)({ colorID, colorDto });
        await this.checkExistColor(colorID);
        const result = await color_model_1.ColorModel.updateOne({ _id: colorID.id }, { ...colorDto });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async findByID(colorID) {
        (0, error_handler_1.errorHandler)({ colorID });
        return await this.checkExistColor(colorID);
    }
    async find() {
        const color = await color_model_1.ColorModel.find({}).lean();
        return color;
    }
    async removeByID(colorID) {
        (0, error_handler_1.errorHandler)({ colorID });
        const color = await this.checkExistColor(colorID);
        const deletedcolor = await color_model_1.ColorModel.deleteOne({ _id: color === null || color === void 0 ? void 0 : color.id });
        if (!deletedcolor.deletedCount)
            throw http_errors_1.default.InternalServerError();
        await product_model_1.ProductModel.updateMany({ color: colorID.id }, { $unset: { color: "" } });
        return true;
    }
    async checkExistColor(colorID) {
        const color = await color_model_1.ColorModel.findById(colorID.id);
        if (!color)
            throw http_errors_1.default.NotFound(color_message_1.ColorMessage.NotFound);
        return color;
    }
}
exports.default = new ColorService();
