import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";
import { plainToClass } from "class-transformer";
import { ProductQueryDTO } from "../../products/product.dto";
import { IColor } from "../../color/color.types";
import { ICategory } from "../../category/category.types";
import ColorService from "../../color/color.service";
import CategoryService from "../../category/category.service";
import ProductService from "../../products/product.service";
import SellerService from "../../seller/seller.service";
import { ISeller } from "../../seller/seller.types";
import { PriceHistoryQueryDTO } from "../../price-history/priceHistory.dto";
import PriceHistoryService from "../../price-history/priceHistory.service";

export class RobotController {
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  private productService = ProductService;
  private priceHistoryService = PriceHistoryService;
  constructor() {
    autoBind(this);
  }

  async robot(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();
      const params = req.params;

      const response: any = await this.productService.find(query, colors, categories, sellers);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/robot/robot-control.ejs", {
        response,
        colors,
        categories,
        sellers,
        pageInfo: { pathUrl: "/panel/robot-control", pathTitle: "مدیریت ربات", query: { ...query, queryString } },
        apiUrl: process.env.API_URL,
      });
    } catch (error) {
      next(error);
    }
  }
  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const query: PriceHistoryQueryDTO = plainToClass(PriceHistoryQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });

      const response: any = await this.priceHistoryService.find(query);

      req.query.page ? delete req.query.page : false;
      const queryPath: any = Object.entries(req.query);
      const queryString = "?" + new URLSearchParams(queryPath).toString();

      res.render("./pages/panel/robot/robot-history.ejs", {
        response,
        pageInfo: { pathUrl: "/panel/robot-history", pathTitle: "تاریخچه تغییر قیمت", query: { ...query, queryString } },
        apiUrl: process.env.API_URL,
      });
    } catch (error) {
      next(error);
    }
  }
}
