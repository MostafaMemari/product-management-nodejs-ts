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
const productControllerEjs = new product_controller_1.ProductControllerEJS();
router.get("/report/:buyAndSell", productController.findAllProductAndSumSellBuy);
router.post("/form", multer_1.default.single("img"), productControllerEjs.create);
router.post("/:id/form", multer_1.default.single("img"), productControllerEjs.update);
router.route("/").post(multer_1.default.single("img"), productController.create).get(productController.find);
router.route("/:id").put(multer_1.default.single("img"), productController.update).get(productController.findByID).delete(productController.removeByID);
router.put("/:id/robot", productController.updateRobot);
exports.default = router;
