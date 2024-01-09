import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";
import { plainToClass } from "class-transformer";
import { ProductQueryDTO } from "../products/product.dto";
import { IColor } from "../color/color.types";
import { ICategory } from "../category/category.types";
import ColorService from "../color/color.service";
import CategoryService from "../category/category.service";
import ProductService from "../products/product.service";
import { ProductModel } from "../products/product.model";
import SellerService from "../seller/seller.service";
import { ISeller } from "../seller/seller.types";

export class DashbaordController {
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  private productService = ProductService;
  constructor() {
    autoBind(this);
  }
  async main(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();
      const sellers: ISeller[] = await this.sellerService.find();

      const response: any = await this.productService.find(query, colors, categories, sellers);

      res.render("./pages/panel/index.ejs", { response, colors, categories });
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

      res.render("./pages/panel/buy.ejs", { response, colors, categories });
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

      res.render("./pages/panel/sell.ejs", { response, colors, categories });
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

      res.render("./pages/panel/products.ejs", { response, colors, categories, sellers });
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

      res.render("./pages/panel/robot.ejs", { response, colors, categories });
    } catch (error) {
      next(error);
    }
  }
}
