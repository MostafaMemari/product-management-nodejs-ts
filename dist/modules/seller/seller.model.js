"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModel = void 0;
const mongoose_1 = require("mongoose");
const SellerSchema = new mongoose_1.Schema({
    sellerID: { type: Number, required: true },
    sellerTitle: { type: String, required: true },
    token: { type: String, required: true },
    accessTokenDigiKala: { type: String },
    isRobot: { type: Boolean, default: false },
}, {
    versionKey: false,
});
exports.SellerModel = (0, mongoose_1.model)("seller", SellerSchema);
