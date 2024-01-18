import autoBind from "auto-bind";
import buyAndSellService from "./buy-sell.service";
import { NextFunction, Request, Response } from "express";
import { BuyAndSellDTO } from "./buy-sell.dto";
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

  async buy(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const buyAndSellDto: BuyAndSellDTO = plainToClass(BuyAndSellDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const productDto: FindDoc<IProduct> = await this.productService.checkExistProduct(productID);
      await this.service.buy(productID, buyAndSellDto, productDto);

      res.status(StatusCodes.OK).json({
        message: BuyAndSellMessage.Buy,
      });
    } catch (error) {
      next(error);
    }
  }
  async sell(req: Request, res: Response, next: NextFunction) {
    try {
      const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const buyAndSellDto: BuyAndSellDTO = plainToClass(BuyAndSellDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
      const productDto: FindDoc<IProduct> = await this.productService.checkExistProduct(productID);
      await this.service.sell(productID, buyAndSellDto, productDto);

      res.status(StatusCodes.OK).json({
        message: BuyAndSellMessage.Sell,
      });
    } catch (error) {
      next(error);
    }
  }

  async reportBuy(req: Request, res: Response, next: NextFunction) {
    const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

    const reportBuyProduct = await this.service.reportBuy(productID);
    res.status(StatusCodes.OK).json({
      data: reportBuyProduct,
    });
  }
  async reportSell(req: Request, res: Response, next: NextFunction) {
    const productID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

    const reportSellProduct = await this.service.reportSell(productID);
    res.status(StatusCodes.OK).json({
      data: reportSellProduct,
    });
  }
}
