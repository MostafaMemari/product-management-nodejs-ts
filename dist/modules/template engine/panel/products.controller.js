"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelController = void 0;
const auto_bind_1 = __importDefault(require("auto-bind"));
const class_transformer_1 = require("class-transformer");
const product_dto_1 = require("../../products/product.dto");
const color_service_1 = __importDefault(require("../../color/color.service"));
const category_service_1 = __importDefault(require("../../category/category.service"));
const product_service_1 = __importDefault(require("../../products/product.service"));
const buy_sell_service_1 = __importDefault(require("../../buy-sell/buy-sell.service"));
const seller_service_1 = __importDefault(require("../../seller/seller.service"));
class PanelController {
    constructor() {
        this.colorService = color_service_1.default;
        this.categoryService = category_service_1.default;
        this.sellerService = seller_service_1.default;
        this.productService = product_service_1.default;
        this.buyAndSellService = buy_sell_service_1.default;
        (0, auto_bind_1.default)(this);
    }
    async main(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, req.params, colors, categories, sellers);
            res.render("", { response, colors, categories, sellers });
        }
        catch (error) {
            next(error);
        }
    }
    async products(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, req.params, colors, categories, sellers);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/products/products.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/products", pathTitle: "محصولات", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async defects(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.defects(query);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/products/products-defects.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/products-defects", pathTitle: "نواقص محصولات", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async buy(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            // const response: any = await this.productService.find(query, "buy", colors, categories, sellers);
            // for (const product of response.products) {
            //   const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), "buy");
            //   product.reportBuy = result;
            // }
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/products/buy-product.ejs", {
                // response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/products-buy", pathTitle: "خرید محصول", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sell(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, req.params, colors, categories, sellers);
            for (const product of response.products) {
                const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), "sell");
                product.reportSell = result;
            }
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/products/sell-product.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/products-sell", pathTitle: "فروش محصول", query: { ...query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sellers(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            const response = await this.productService.find(query, req.params, colors, categories, sellers);
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/sellers.ejs", {
                response,
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/sellers", pathTitle: "فروشندگان", query: { query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
    async categoryAndColor(req, res, next) {
        try {
            const query = (0, class_transformer_1.plainToClass)(product_dto_1.ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
            const colors = await this.colorService.find();
            const categories = await this.categoryService.find();
            const sellers = await this.sellerService.find();
            req.query.page ? delete req.query.page : false;
            const queryPath = Object.entries(req.query);
            const queryString = "?" + new URLSearchParams(queryPath).toString();
            res.render("./pages/panel/category-color.ejs", {
                colors,
                categories,
                sellers,
                pageInfo: { pathUrl: "/panel/category-color", pathTitle: "فروشندگان", query: { query, queryString } },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PanelController = PanelController;
