"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const PriceHistorySchema = new mongoose_1.Schema({
    sellerBuyBox: {
        sellerID: { type: Number, required: true },
        title: { type: String, required: true },
        shipmentTime: { type: String, required: true },
    },
    mySeller: {
        seller: { type: mongoose_1.Types.ObjectId, ref: "seller", required: true },
        shipmentTime: { type: String, required: true },
    },
    product: {
        title: { type: String, required: true },
        dkp: { type: Number, required: true },
        dkpc: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    status: { type: String, enum: ["موفق", "ناموفق"], required: true },
    operation: { type: String, required: true },
    date: { type: String },
    hour: { type: String },
}, { timestamps: true, versionKey: false });
exports.PriceHistoryModel = (0, mongoose_1.model)("price_history", PriceHistorySchema);
