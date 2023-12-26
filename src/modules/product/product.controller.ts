import { NextFunction, Request, Response } from "express";

import { ProductDTO } from "./product.dto";
import { plainToClass } from "class-transformer";
import { IProduct } from "./product.types";
import { StatusCodes } from "http-status-codes";
import productService from "./product.service";
import { ProductMessage } from "./product.message";
import autoBind from "auto-bind";
import { ObjectIdDTO } from "../../types/public.types";

export class ProductController {
  private service = productService;
  constructor() {
    autoBind(this);
  }
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(productDto);
      res.status(StatusCodes.CREATED).json({
        message: ProductMessage.CREATED,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getProdcut(req: Request, res: Response, next: NextFunction) {
    try {
      const productDto: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const product = await this.service.getProduct(productDto);
      res.status(StatusCodes.OK).json({
        message: ProductMessage.SUCCESSFULLY,
        data: { product },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getProdcuts(req: Request, res: Response, next: NextFunction) {
    try {
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(productDto);
      res.status(StatusCodes.CREATED).json({
        message: ProductMessage.CREATED,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(productDto);
      res.status(StatusCodes.CREATED).json({
        message: ProductMessage.CREATED,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });
      await this.service.create(productDto);
      res.status(StatusCodes.CREATED).json({
        message: ProductMessage.CREATED,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
