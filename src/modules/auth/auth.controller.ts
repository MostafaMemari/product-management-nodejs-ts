import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { AuthMessage } from "./auth.message";
import autoBind from "auto-bind";
import authService from "./auth.service";
import { IUser } from "./auth.types";
import { UserDTO, UserLoginDTO } from "./auth.dto";
import { plainToClass } from "class-transformer";
import { errorHandler } from "../../common/exception/error.handler";
import { CookieNames } from "../../common/constant/public.enum";
import { NodeEnv } from "../../common/constant/env.enum";
import { AuthorizationMessage } from "../../common/messages/auth.message";

export class AuthController {
  private service = authService;
  constructor() {
    autoBind(this);
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserDTO = plainToClass(UserDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });

      const token = await this.service.register(userDto);

      res
        .cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          maxAge: 604800000,
          secure: process.env.NODE_ENV === NodeEnv.Development, // production => true
        })
        .status(StatusCodes.OK)
        .json({
          status: StatusCodes.OK,
          message: AuthMessage.Register,
        });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserLoginDTO = plainToClass(UserLoginDTO, req.body, { excludeExtraneousValues: true, exposeUnsetFields: false });
      const accessToken = await this.service.login(userDto);

      res
        .cookie(CookieNames.AccessToken, accessToken, {
          httpOnly: true,
          maxAge: 604800000,
          secure: process.env.NODE_ENV === NodeEnv.Development, // production => true
        })
        .status(StatusCodes.OK)
        .json({
          status: StatusCodes.OK,
          message: AuthMessage.Login,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(CookieNames.AccessToken);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
}
