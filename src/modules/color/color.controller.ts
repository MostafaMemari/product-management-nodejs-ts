import { NextFunction, Request, Response } from "express";

import { ColorDTO, ColorUpdateDTO } from "./color.dto";
import { plainToClass } from "class-transformer";
import { IColor } from "./color.types";
import { StatusCodes } from "http-status-codes";
import colorService from "./color.service";
import { ColorMessage } from "./color.message";
import autoBind from "auto-bind";
import { ObjectIdDTO } from "../../types/public.types";

export class ColorController {
  private service = colorService;
  constructor() {
    autoBind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const colorDto: ColorDTO = plainToClass(ColorDTO, req.body, { excludeExtraneousValues: true });

      await this.service.create(colorDto);
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: ColorMessage.Created,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const colorID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const colorDto: ColorUpdateDTO = plainToClass(ColorUpdateDTO, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await this.service.update(colorID, colorDto);

      res.status(StatusCodes.OK).json({
        message: ColorMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req: Request, res: Response, next: NextFunction) {
    try {
      const colorID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      const color = await this.service.findByID(colorID);
      res.status(StatusCodes.OK).json({
        data: { color },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const colors: IColor[] = await this.service.find();

      res.status(StatusCodes.OK).json({
        data: { colors },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeByID(req: Request, res: Response, next: NextFunction) {
    try {
      const colorID: ObjectIdDTO = plainToClass(ObjectIdDTO, req.params, { excludeExtraneousValues: true });

      await this.service.removeByID(colorID);
      res.status(StatusCodes.OK).json({
        message: ColorMessage.Deleted,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
