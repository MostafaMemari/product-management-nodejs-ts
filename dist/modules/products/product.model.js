"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    dkp: { type: Number, required: true },
    dkpc: { type: Number, required: true },
    price: { type: Number },
    img: { type: String },
    url: { type: String },
    height: { type: Number },
    width: { type: Number },
    count: { type: Number, default: 0 },
    color: { type: mongoose_1.Types.ObjectId, ref: "color" },
    category: { type: mongoose_1.Types.ObjectId, ref: "category" },
    seller: { type: mongoose_1.Types.ObjectId, ref: "seller" },
}, {
    versionKey: false,
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("product", ProductSchema);
