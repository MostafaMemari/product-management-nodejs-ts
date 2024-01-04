import autoBind from "auto-bind";
import buyAndSellService from "./buy-sell.service";
import { NextFunction, Request, Response } from "express";
import { BuyAndSellDTO, buyAndSellDTO } from "./buy-sell.dto";
import { plainToClass } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import { BuyAndSellMessage } from "./buy-sell.message";
import { FindDoc, ObjectIdDTO } from "../../types/public.types";
import { IProduct } from "../products/product.types";
import productService from "../products/product.service";

export class BuyAndSellController {
  private service = buyAndSellService;
  private productService = productService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.create(req.body);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: BuyAndSellMessage.Successfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async buyAndSell(req: Request, res: Response, next: NextFunction) {
    try {
      const pathUrl: string | undefined = req.url.split("/").pop();

      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });
      const buyAndSellDto: buyAndSellDTO = plainToClass(buyAndSellDTO, req.body, { excludeExtraneousValues: true });
      const productDto: FindDoc<IProduct> = await this.productService.checkExistProduct(productID);

      if (pathUrl === "buy") {
        await this.service.buy(productID, buyAndSellDto, productDto);
      } else if (pathUrl === "sell") {
        await this.service.sell(productID, buyAndSellDto, productDto);
      }
      res.status(StatusCodes.OK).json({
        message: BuyAndSellMessage.Buy,
      });
    } catch (error) {
      next(error);
    }
  }
}
