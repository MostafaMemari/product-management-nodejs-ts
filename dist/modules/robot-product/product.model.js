"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const robotSchema = new mongoose_1.Schema({
    reducePrice: { type: Number, default: 0 },
    maxPrice: { type: Number, default: 0 },
    minPrice: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    isBuyBox: { type: Boolean, default: false },
    isCheckPrice: { type: Boolean, default: false },
}, {
    _id: false,
    versionKey: false,
});
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    dkp: { type: Number, required: true },
    dkpc: { type: Number, required: true, unique: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    count: { type: Number, default: 0 },
    img: { type: String },
    price: { type: Number },
    robot: { type: robotSchema, default: { robotSchema } },
    color: { type: mongoose_1.Types.ObjectId, ref: "color" },
    category: { type: mongoose_1.Types.ObjectId, ref: "category" },
    seller: { type: mongoose_1.Types.ObjectId, ref: "seller" },
}, {
    versionKey: false,
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("product", ProductSchema);
