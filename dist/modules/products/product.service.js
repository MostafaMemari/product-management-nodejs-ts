"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const error_handler_1 = require("../../common/exception/error.handler");
const product_model_1 = require("./product.model");
const product_message_1 = require("./product.message");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const buy_sell_model_1 = require("../buy-sell/buy-sell.model");
class ProductService {
    async create(productDto, reqFile) {
        (0, error_handler_1.errorHandler)({ productDto });
        let img = null;
        if (reqFile) {
            const { destination, filename } = reqFile;
            img = (destination + "/" + filename).replace("public/", "/");
        }
        else {
            img = process.env.DEFAULT_IMG_PRODUCT;
        }
        const product = await product_model_1.ProductModel.create({ ...productDto, img });
        return product;
    }
    async update(productID, productDto, reqFile) {
        (0, error_handler_1.errorHandler)({ productID, productDto });
        const product = await this.checkExistProduct(productID);
        const defaultPathImg = process.env.DEFAULT_IMG_PRODUCT;
        let img = null;
        if (reqFile) {
            const { destination, filename } = reqFile;
            const pathNewImg = (destination + "/" + filename).replace("public/", "/");
            if (product === null || product === void 0 ? void 0 : product.img) {
                if ((product === null || product === void 0 ? void 0 : product.img) === pathNewImg) {
                    img = pathNewImg;
                }
                else {
                    if ((product === null || product === void 0 ? void 0 : product.img) !== defaultPathImg) {
                        fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "public", product === null || product === void 0 ? void 0 : product.img));
                        img = pathNewImg;
                    }
                    else {
                        img = pathNewImg;
                    }
                }
            }
            else {
                img = pathNewImg;
            }
        }
        else {
            img = (product === null || product === void 0 ? void 0 : product.img) ? product === null || product === void 0 ? void 0 : product.img : defaultPathImg;
        }
        const result = await product_model_1.ProductModel.updateOne({ _id: productID.id }, { ...productDto, img });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async updateRobot(productID, productDto) {
        (0, error_handler_1.errorHandler)({ productID, productDto });
        const result = await product_model_1.ProductModel.updateOne({ _id: productID.id }, { robot: { ...productDto } });
        if (!result.modifiedCount)
            throw http_errors_1.default.InternalServerError();
        return true;
    }
    async findByID(productID) {
        (0, error_handler_1.errorHandler)({ productID });
        return await this.checkExistProduct(productID);
    }
    async find(query, colorsDto, categoryDto, sellerDto) {
        var _a, _b, _c;
        const page = parseInt(query.page) - 1 || 0;
        const limit = parseInt(query.limit) || 15;
        const search = query.search || "";
        const sort = query.sort == "asc" ? "asc" : "desc" || "desc";
        let categories = ((_a = query === null || query === void 0 ? void 0 : query.category) === null || _a === void 0 ? void 0 : _a.split(",")) || "ALL";
        let colors = ((_b = query === null || query === void 0 ? void 0 : query.color) === null || _b === void 0 ? void 0 : _b.split(",")) || "ALL";
        let sellers = ((_c = query === null || query === void 0 ? void 0 : query.seller) === null || _c === void 0 ? void 0 : _c.split(",")) || "ALL";
        colors === "ALL"
            ? (colors = colorsDto.map((color) => String(color._id)))
            : (colors = colorsDto.filter((color) => colors.includes(color.name)).map((id) => String(id._id)));
        categories === "ALL"
            ? (categories = categoryDto.map((category) => String(category._id)))
            : (categories = categoryDto.filter((category) => categories.includes(category.name)).map((id) => String(id._id)));
        sellers === "ALL"
            ? (sellers = sellerDto.map((seller) => String(seller._id)))
            : (sellers = sellerDto.filter((seller) => sellers.includes(seller.sellerTitle)).map((id) => String(id._id)));
        const products = await product_model_1.ProductModel.find({ title: { $regex: search, $options: "i" } })
            .where("category")
            .in(categories)
            .where("color")
            .in(colors)
            .where("seller")
            .in(sellers)
            .skip(page * limit)
            .limit(limit)
            .sort({ updatedAt: sort == "asc" ? 1 : -1 })
            .populate("color")
            .populate("category")
            .populate("seller", "sellerTitle")
            .lean();
        const total = await product_model_1.ProductModel.countDocuments({
            category: { $in: [...categories] },
            color: { $in: [...colors] },
            seller: { $in: [...sellers] },
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
    async defects(query) {
        const page = parseInt(query.page) - 1 || 0;
        const limit = parseInt(query.limit) || 15;
        const search = query.search || "";
        const sort = query.sort == "asc" ? "asc" : "desc" || "desc";
        const products = await product_model_1.ProductModel.find({
            title: { $regex: search, $options: "i" },
            $or: [{ color: { $exists: false } }, { category: { $exists: false } }, { seller: { $exists: false } }],
        })
            .skip(page * limit)
            .limit(limit)
            .sort({ updatedAt: sort == "asc" ? 1 : -1 })
            .populate("color")
            .populate("category")
            .populate("seller", "sellerTitle")
            .lean();
        const total = await product_model_1.ProductModel.countDocuments({
            title: { $regex: search, $options: "i" },
            $or: [{ color: { $exists: false } }, { category: { $exists: false } }, { seller: { $exists: false } }],
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
        const deletedProduct = await product_model_1.ProductModel.deleteOne({ _id: product === null || product === void 0 ? void 0 : product._id });
        if (!deletedProduct.deletedCount)
            throw http_errors_1.default.InternalServerError();
        (product === null || product === void 0 ? void 0 : product.img) !== process.env.DEFAULT_IMG_PRODUCT ? fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "public", String(product === null || product === void 0 ? void 0 : product.img))) : false;
        await buy_sell_model_1.BuyAndSellModel.deleteMany({ product: productID.id });
        return true;
    }
    async checkExistProduct(productID) {
        const product = await product_model_1.ProductModel.findById(productID.id).lean();
        if (!product)
            throw http_errors_1.default.NotFound(product_message_1.ProductMessage.NotFound);
        return product;
    }
    async checkExistProductDKPC(dkpc) {
        const product = await product_model_1.ProductModel.findOne({ dkpc: dkpc.dkpc });
        if (product)
            throw http_errors_1.default.Conflict(product_message_1.ProductMessage.Conflict);
        return product;
    }
}
exports.default = new ProductService();
