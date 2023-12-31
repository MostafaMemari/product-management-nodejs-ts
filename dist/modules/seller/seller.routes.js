"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seller_controller_1 = require("./seller.controller");
const router = (0, express_1.Router)();
const sellerController = new seller_controller_1.SellerController();
router.post("/", sellerController.create);
router.get("/", sellerController.find);
router.put("/:id", sellerController.update);
router.delete("/:id/", sellerController.removeByID);
router.get("/:id", sellerController.findByID);
exports.default = router;
