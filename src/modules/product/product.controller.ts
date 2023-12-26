import { NextFunction, Request, Response } from "express";

import { ProductDTO } from "./product.dto";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { errorHandler } from "../../common/exception/error.handler";
import { IProduct } from "./product.types";
import productService from "./product.service";

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      const product: IProduct = await productService.create(productDto);
      res.json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
