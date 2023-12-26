"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
router.post("/", productController.createProduct);
router.get("/:id", productController.getProdcut);
exports.default = router;
