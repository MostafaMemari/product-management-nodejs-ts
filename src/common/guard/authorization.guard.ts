import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AuthorizationMessage } from "../messages/auth.message";
import { verifyToken } from "../utils/functions";
import { UserModel } from "../../modules/auth/auth.model";
import { IUser } from "../../modules/auth/auth.types";

export async function Authorization(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req?.cookies?.accessToken;
    if (!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data: any = await verifyToken(token);

    if (typeof data === "object" && "id" in data) {
      const user: any = await UserModel.findById(data.id).select("-password").lean();
      if (!user) throw createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
      if (user.role === "SUPER_ADMIN") {
        req.user = user;
        return next();
      } else {
        throw next(createHttpError.Unauthorized(AuthorizationMessage.UnAuthorized));
      }
    }
    throw createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
  } catch (error) {
    // res.redirect("/auth/register");
    next(error);
  }
}
