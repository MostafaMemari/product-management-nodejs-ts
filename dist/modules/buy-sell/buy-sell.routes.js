"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buy_sell_controller_1 = require("./buy-sell.controller");
const router = (0, express_1.Router)();
const buyAndSellController = new buy_sell_controller_1.BuyAndSellController();
router.post("/", buyAndSellController.create);
exports.default = router;
