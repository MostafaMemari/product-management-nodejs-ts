"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
router.route("/").post(categoryController.create).get(categoryController.find);
router.route("/:id").put(categoryController.update).delete(categoryController.removeByID).get(categoryController.findByID);
exports.default = router;
