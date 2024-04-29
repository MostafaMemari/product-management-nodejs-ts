"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectLoginUser = void 0;
const functions_1 = require("../utils/functions");
const auth_model_1 = require("../../modules/auth/auth.model");
async function redirectLoginUser(req, res, next) {
    const isLogin = await isLoginUser(req);
    if (isLogin) {
        return res.redirect("/panel/products");
    }
    else {
        next();
    }
}
exports.redirectLoginUser = redirectLoginUser;
async function isLoginUser(req) {
    var _a;
    let isLogin = null;
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    if (!token)
        return (isLogin = false);
    const verifiedToken = (0, functions_1.verifyToken)(token);
    const user = await auth_model_1.UserModel.findOne(verifiedToken.id, { password: 0 }).lean();
    if (user) {
        req.user = user;
        return (isLogin = true);
    }
}
