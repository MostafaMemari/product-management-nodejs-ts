import { NextFunction, Request, Response } from "express";

import { SellerDTO, SellerUpdateDTO } from "./seller.dto";
import { plainToClass } from "class-transformer";
import { ISeller } from "./seller.types";
import { StatusCodes } from "http-status-codes";
import sellerService from "./seller.service";
import { SellerMessage } from "./seller.message";
import autoBind from "auto-bind";
import { ObjectIdDTO } from "../../types/public.types";
import { stringToNumber } from "../../common/utils/functions";

export class SellerController {
  private service = sellerService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { isRobot } = req.body;
      req.body.isRobot = isRobot ? true : false;
      req.body.sellerID = Number(req.body.sellerID);

      const sellerDto: SellerDTO = plainToClass(SellerDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      await this.service.create(sellerDto);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: SellerMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { isRobot } = req.body;
      req.body.isRobot = isRobot ? true : false;
      req.body.sellerID = Number(req.body.sellerID);

      const sellerID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const sellerDto: SellerUpdateDTO = plainToClass(SellerUpdateDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await this.service.update(sellerID, sellerDto);

      res.status(StatusCodes.OK).json({
        message: SellerMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const seller = await this.service.findByID(sellerID);
      res.status(StatusCodes.OK).json({
        data: { seller },
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const sellers: ISeller[] = await this.service.find();

      res.status(StatusCodes.OK).json({
        data: { sellers },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeByID(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      await this.service.removeByID(sellerID);
      res.status(StatusCodes.OK).json({
        message: SellerMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
export class SellerControllerEJS {
  private service = sellerService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { isRobot } = req.body;
      req.body.isRobot = isRobot === "on" ? true : false;
      req.body.sellerID = Number(req.body.sellerID);

      const sellerDto: SellerDTO = plainToClass(SellerDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(sellerDto);

      req.flash("success", SellerMessage.Created);
      res.redirect("/panel/sellers");
    } catch (error) {
      req.flash("error", SellerMessage.ErrorCreate);
      res.redirect("/panel/sellers");
      // next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { isRobot } = req.body;
      req.body.isRobot = isRobot === "on" ? true : false;
      req.body.sellerID = Number(req.body.sellerID);

      const sellerID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const sellerDto: SellerUpdateDTO = plainToClass(SellerUpdateDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });

      await this.service.update(sellerID, sellerDto);

      req.flash("success", SellerMessage.Updated);
      res.redirect("/panel/sellers");
    } catch (error) {
      req.flash("error", SellerMessage.ErrorUpdate);
      res.redirect("/panel/sellers");
      next(error);
    }
  }
}
