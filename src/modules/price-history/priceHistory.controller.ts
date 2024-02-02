import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import autoBind from "auto-bind";
import { IPriceHistory } from "./priceHistory.types";
import priceHistoryService from "./priceHistory.service";
import { PriceHistoryQueryDTO } from "./priceHistory.dto";
import { plainToClass } from "class-transformer";

export class PriceHistoryController {
  private service = priceHistoryService;
  constructor() {
    autoBind(this);
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query: PriceHistoryQueryDTO = plainToClass(PriceHistoryQueryDTO, req.query, { excludeExtraneousValues: true, exposeUnsetFields: false });

      const priceHistory: IPriceHistory[] = await this.service.find(query);

      res.status(StatusCodes.OK).json({
        data: { priceHistory },
      });
    } catch (error) {
      next(error);
    }
  }
}
