"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const multer_1 = __importDefault(require("../../common/utils/multer"));
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
router.post("/:id", multer_1.default.single("img"), productController.update);
router.post("/", multer_1.default.single("img"), productController.create);
router.get("/", productController.find);
router.get("/:id", productController.findByID);
router.delete("/:id", productController.removeByID);
exports.default = router;
