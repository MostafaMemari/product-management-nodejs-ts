import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AuthorizationMessage } from "../messages/auth.message";
import { verifyToken } from "../utils/functions";
import { UserModel } from "../../modules/auth/auth.model";

export async function Authorization(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req?.cookies?.access_token;
    if (!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data = await verifyToken(token);

    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, { password: 0 }).lean();
      if (!user) throw createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
      req.user = user;
      return next();
    }
    throw createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
  } catch (error) {
    res.redirect("/auth/register");
    // next(error);
  }
}
