"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const color_controller_1 = require("./color.controller");
const router = (0, express_1.Router)();
const colorController = new color_controller_1.ColorController();
router.route("/").post(colorController.create).get(colorController.find);
router.route("/:id").put(colorController.update).get(colorController.findByID).delete(colorController.removeByID);
exports.default = router;
