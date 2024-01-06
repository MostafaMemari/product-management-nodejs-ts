import { NextFunction, Request, Response } from "express";
import { ProductDTO, ProductQueryDTO, ProductUpdateDTO } from "./product.dto";
import { plainToClass } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import productService from "./product.service";
import { ProductMessage } from "./product.message";
import autoBind from "auto-bind";
import { ObjectIdDTO } from "../../types/public.types";
import ColorService from "../color/color.service";
import { IColor } from "../color/color.types";
import CategoryService from "../category/category.service";
import { ICategory } from "../category/category.types";
import { stringToNumber } from "../../common/utils/functions";

export class ProductController {
  private service = productService;
  private colorService = ColorService;
  private categoryService = CategoryService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(productDto, req.file);

      req.flash("success", "ثبت محصول با موفقیت انجام شد");

      res.redirect("/panel/products");

      // res.status(StatusCodes.CREATED).json({
      //   statusCode: StatusCodes.CREATED,
      //   message: ProductMessage.Created,
      // });
    } catch (error) {
      req.flash("error", "ثبت محصول با خطا مواجه شد");
      res.redirect("/panel/products");
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      stringToNumber(req.body);
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: ProductUpdateDTO = plainToClass(ProductUpdateDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await this.service.update(productID, productDto, req.file);

      req.flash("success", "ویرایش با موفقیت انجام شد");

      res.redirect("/panel/products");

      // res.status(StatusCodes.OK).json({
      //   message: ProductMessage.Updated,
      // });
    } catch (error) {
      req.flash("error", "ویرایش با خطا مواجه شد");
      res.redirect("/panel/products");

      next(error);
    }
  }
  async findByID(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const product = await this.service.findByID(productID);
      res.status(StatusCodes.OK).json({
        data: { product },
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ProductQueryDTO = plainToClass(ProductQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colors: IColor[] = await this.colorService.find();
      const categories: ICategory[] = await this.categoryService.find();

      const response: any = await this.service.find(query, colors, categories);

      res.status(StatusCodes.OK).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeByID(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      await this.service.removeByID(productID);
      res.status(StatusCodes.OK).json({
        message: ProductMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
