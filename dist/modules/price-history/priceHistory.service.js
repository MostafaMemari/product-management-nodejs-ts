"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priceHistory_model_1 = require("./priceHistory.model");
class PriceHistoryService {
    async find(query) {
        const page = parseInt(query.page) - 1 || 0;
        const limit = parseInt(query.limit) || 15;
        const search = query.search || "";
        const sort = query.sort == "asc" ? "asc" : "desc" || "desc";
        const priceHistory = await priceHistory_model_1.PriceHistoryModel.find({ "product.title": { $regex: search, $options: "i" } })
            .skip(page * limit)
            .limit(limit)
            .sort({ updatedAt: sort == "asc" ? 1 : -1 })
            .populate("mySeller.seller", "sellerTitle")
            .lean();
        const total = await priceHistory_model_1.PriceHistoryModel.countDocuments({
            "product.title": { $regex: search, $options: "i" },
        });
        const response = {
            total,
            pages: Math.ceil(total / limit),
            page: page + 1,
            limit,
            priceHistory,
        };
        return response;
    }
}
exports.default = new PriceHistoryService();
