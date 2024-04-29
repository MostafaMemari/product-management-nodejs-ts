"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authorization_guard_1 = require("../../common/guard/authorization.guard");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/getMe", authorization_guard_1.Authorization, authController.getMe);
exports.default = router;
