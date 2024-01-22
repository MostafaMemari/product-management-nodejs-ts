"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorModel = void 0;
const mongoose_1 = require("mongoose");
const ColorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, {
    versionKey: false,
});
exports.ColorModel = (0, mongoose_1.model)("color", ColorSchema);
