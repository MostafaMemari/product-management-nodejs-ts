import autoBind from "auto-bind";
import buyAndSellService from "./buy-sell.service";
import { NextFunction, Request, Response } from "express";
import { BuyAndSellDTO } from "./buy-sell.dto";
import { plainToClass } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import { BuyAndSellMessage } from "./buy-sell.message";

export class BuyAndSellController {
  private service = buyAndSellService;
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
      console.log(error);
      next(error);
    }
  }
}
