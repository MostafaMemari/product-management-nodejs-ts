"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
}, {
    versionKey: false,
});
exports.CategoryModel = (0, mongoose_1.model)("category", CategorySchema);
