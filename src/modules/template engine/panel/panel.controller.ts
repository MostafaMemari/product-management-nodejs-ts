import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";
import { plainToClass } from "class-transformer";
import { ProductQueryDTO } from "../../products/product.dto";
import { IColor } from "../../color/color.types";
import { ICategory } from "../../category/category.types";
import ColorService from "../../color/color.service";
import CategoryService from "../../category/category.service";
import ProductService from "../../products/product.service";
import BuyAndSellService from "../../buy-sell/buy-sell.service";
import SellerService from "../../seller/seller.service";
import { ISeller } from "../../seller/seller.types";

export class PanelController {
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  private productService = ProductService;
  private buyAndSellService = BuyAndSellService;
  constructor() {
    autoBind(this);
  }
  async main(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response = await this.productService.find(query, colors, categories, sellers);

      res.render("", { response, colors, categories, sellers });
    } catch (error) {
      next(error);
    }
  }

  async robot(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/robot-control.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/robot-control", pathTitle: "مدیریت ربات", query: { ...query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async products(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/list-products.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/products", pathTitle: "محصولات", query: { ...query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async defects(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.defects(query);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/list-products-defects.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/products-defects", pathTitle: "نواقص محصولات", query: { ...query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async buy(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      for (const product of response.products) {
        const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), "buy");
        product.reportBuy = result;
      }

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/buy-product.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/products-buy", pathTitle: "خرید محصول", query: { ...query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async sell(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      for (const product of response.products) {
        const result = await this.buyAndSellService.sumCountAllAndMonthBuyOrSell(product._id.toString(), "sell");
        product.reportSell = result;
      }

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/sell-product.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/products-sell", pathTitle: "فروش محصول", query: { ...query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async sellers(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/list-sellers.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/sellers", pathTitle: "فروشندگان", query: { query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
  async categoryAndColor(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/list-category-color.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/category-color", pathTitle: "فروشندگان", query: { query, queryString } },
      });
    } catch (error) {
      next(error);
    }
  }
}
