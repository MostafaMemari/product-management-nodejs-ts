"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyModel = void 0;
const mongoose_1 = require("mongoose");
const BuySchema = new mongoose_1.Schema({
    product: { type: String, required: true },
}, {
    versionKey: false,
});
exports.BuyModel = (0, mongoose_1.model)("buy", BuySchema);
