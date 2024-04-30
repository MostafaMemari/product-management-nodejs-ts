import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/functions";
import { UserModel } from "../../modules/auth/auth.model";

export async function redirectLoginUser(req: Request, res: Response, next: NextFunction) {
  const isLogin = await isLoginUser(req);

  if (isLogin) {
    return res.redirect("/panel/products");
  } else {
    next();
  }
}

async function isLoginUser(req: Request) {
  let isLogin = null;
  const token = req?.cookies?.accessToken;
  if (!token) return (isLogin = false);
  const verifiedToken: any = verifyToken(token);

  const user: any = await UserModel.findOne(verifiedToken.id, { password: 0 }).lean();
  if (user) {
    req.user = user;
    return (isLogin = true);
  }
}
