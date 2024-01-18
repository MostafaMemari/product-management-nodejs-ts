"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const color_service_1 = __importDefault(require("../../color/color.service"));
const category_service_1 = __importDefault(require("../../category/category.service"));
const product_service_1 = __importDefault(require("../../products/product.service"));
const buy_sell_service_1 = __importDefault(require("../../buy-sell/buy-sell.service"));
const seller_service_1 = __importDefault(require("../../seller/seller.service"));
const public_enum_1 = require("../../../common/constant/public.enum");
class AuthController {
    constructor() {
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        this.productService = product_service_1.default;
        this.buyAndSellService = buy_sell_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async login(req, res, next) {
        try {
            res.locals.layout = "./layouts/auth/main.ejs";
            res.render("./pages/auth/login.ejs", { page: "login" });
        }
        catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            res.locals.layout = "./layouts/auth/main.ejs";
            res.render("./pages/auth/register.ejs", { page: "register" });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            res.clearCookie(public_enum_1.CookieNames.AccessToken);
            req.flash("success", "خروج با موفقیت انجام شد");
            res.redirect("/auth/login");
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
