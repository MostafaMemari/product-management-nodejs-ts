"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAndSellModel = void 0;
const mongoose_1 = require("mongoose");
const BuyAndSellSchema = new mongoose_1.Schema({
    product: { type: String, required: true },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    operation: { type: String, default: "فروش", enum: ["خرید", "فروش", "دپو", "خرابی"] },
}, {
    versionKey: false,
});
exports.BuyAndSellModel = (0, mongoose_1.model)("buy", BuyAndSellSchema);
