"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const priceHistory_controller_1 = require("./priceHistory.controller");
const router = (0, express_1.Router)();
const priceHistoryController = new priceHistory_controller_1.PriceHistoryController();
router.route("/").get(priceHistoryController.find);
exports.default = router;
