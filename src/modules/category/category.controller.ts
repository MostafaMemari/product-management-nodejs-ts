import { NextFunction, Request, Response } from "express";

import { CategoryDTO, CategoryUpdateDTO } from "./category.dto";
import { plainToClass } from "class-transformer";
import { ICategory } from "./category.types";
import { StatusCodes } from "http-status-codes";
import categorieService from "./category.service";
import { CategoryMessage } from "./category.message";
import autoBind from "auto-bind";
import { ObjectIdDTO } from "../../types/public.types";

export class CategoryController {
  private service = categorieService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryDto: CategoryDTO = plainToClass(CategoryDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(categoryDto);

      req.flash("success", "ثبت دسته بندی انجام شد");

      res.redirect("/panel/products");

      // res.status(StatusCodes.CREATED).json({
      //   statusCode: StatusCodes.CREATED,
      //   message: CategoryMessage.Created,
      // });
    } catch (error) {
      req.flash("error", "ثبت دسته بندی با خطا مواجه شد");
      res.redirect("/panel/products");
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const categoryDto: CategoryUpdateDTO = plainToClass(CategoryUpdateDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await this.service.update(categoryID, categoryDto);

      req.flash("success", "ثبت دسته بندی انجام شد");

      res.redirect("/panel/products");

      // res.status(StatusCodes.OK).json({
      //   message: CategoryMessage.Updated,
      // });
    } catch (error) {
      req.flash("error", "ویرایش دسته بندی با خطا مواجه شد");
      res.redirect("/panel/products");
      next(error);
    }
  }
  async findByID(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const category = await this.service.findByID(categoryID);
      res.status(StatusCodes.OK).json({
        data: { category },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const categories: ICategory[] = await this.service.find();

      res.status(StatusCodes.OK).json({
        data: { categories },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeByID(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params);
      const categoryID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      await this.service.removeByID(categoryID);
      res.status(StatusCodes.OK).json({
        message: CategoryMessage.Deleted,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
