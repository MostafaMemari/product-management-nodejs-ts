"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seller_controller_1 = require("./seller.controller");
const multer_1 = __importDefault(require("../../common/utils/multer"));
const router = (0, express_1.Router)();
const sellerController = new seller_controller_1.SellerController();
const sellerControllerEJS = new seller_controller_1.SellerControllerEJS();
router.route("/").post(multer_1.default.single("img"), sellerController.create).get(sellerController.find);
router.route("/:id").put(sellerController.update).delete(sellerController.removeByID).get(sellerController.findByID);
router.post("/form", sellerControllerEJS.create);
router.post("/:id/form", sellerControllerEJS.update);
exports.default = router;
