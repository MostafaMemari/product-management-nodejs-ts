"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const seller_model_1 = require("./seller.model");
const seller_message_1 = require("./seller.message");
const product_model_1 = require("../products/product.model");
class SellerSevice {
    async create(sellerDto) {
        const checkExistSeller = await this.checkExistSellerID(sellerDto.sellerID);
        if (checkExistSeller)
            throw http_errors_1.default.Conflict("ثبت فروشنده با خطا مواجه شد");
        (0, error_handler_1.errorHandler)({ sellerDto });
        const seller = await seller_model_1.SellerModel.create(sellerDto);
        return seller;
    }
    async update(sellerID, sellerDto) {
        (0, error_handler_1.errorHandler)({ sellerID, sellerDto });
        await this.checkExistSeller(sellerID);
        const result = await seller_model_1.SellerModel.updateOne({ _id: sellerID.id }, { ...sellerDto });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async findByID(sellerID) {
        (0, error_handler_1.errorHandler)({ sellerID });
        return await this.checkExistSeller(sellerID);
    }
    async find() {
        const seller = await seller_model_1.SellerModel.find({}).lean();
        return seller;
    }
    async removeByID(sellerID) {
        (0, error_handler_1.errorHandler)({ sellerID });
        const seller = await this.checkExistSeller(sellerID);
        const deleteSeller = await seller_model_1.SellerModel.deleteOne({ _id: seller === null || seller === void 0 ? void 0 : seller.id });
        if (!deleteSeller.deletedCount)
            throw http_errors_1.default.InternalServerError();
        await product_model_1.ProductModel.updateMany({ Seller: sellerID.id }, { $unset: { Seller: "" } });
        return true;
    }
    async checkExistSeller(sellerID) {
        const Seller = await seller_model_1.SellerModel.findById(sellerID.id);
        if (!Seller)
            throw http_errors_1.default.NotFound(seller_message_1.SellerMessage.NotFound);
        return Seller;
    }
    async checkExistSellerID(sellerID) {
        const Seller = await seller_model_1.SellerModel.findOne({ sellerID });
        return Seller;
    }
}
exports.default = new SellerSevice();
