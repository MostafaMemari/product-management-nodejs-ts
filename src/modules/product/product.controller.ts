import { NextFunction, Request, Response } from "express";
import { ProductDTO, ProductUpdateDTO } from "./product.dto";
import { plainToClass } from "class-transformer";
import { IProduct } from "./product.types";
import { StatusCodes } from "http-status-codes";
import productService from "./product.service";
import { ProductMessage } from "./product.message";
import autoBind from "auto-bind";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import BuyAndSellService from "../../modules/buy-sell/buy-sell.service";

export class ProductController {
  private service = productService;
  private buyAndSellService = BuyAndSellService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const productDto: ProductDTO = plainToClass(ProductDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(productDto);
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: ProductMessage.Created,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: ProductUpdateDTO = plainToClass(ProductUpdateDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await this.service.update(productID, productDto);

      res.status(StatusCodes.OK).json({
        message: ProductMessage.Updated,
      });
    } catch (error) {
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
      console.log(error);
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const products: IProduct[] = await this.service.find();

      res.status(StatusCodes.OK).json({
        data: { products },
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
      next(error);
    }
  }
}
