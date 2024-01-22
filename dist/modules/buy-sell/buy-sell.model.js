"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAndSellModel = void 0;
const mongoose_1 = require("mongoose");
const BuyAndSellSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Types.ObjectId, required: true, ref: "product" },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number },
    operation: { type: String, default: "فروش", enum: ["خرید", "فروش", "دپو", "خرابی"] },
    status: { type: String, default: "buy", enum: ["buy", "sell"] },
}, {
    versionKey: false,
    timestamps: true,
});
exports.BuyAndSellModel = (0, mongoose_1.model)("buyAndsell", BuyAndSellSchema);
