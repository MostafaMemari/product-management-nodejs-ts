import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";
import { plainToClass } from "class-transformer";
import { ProductQueryDTO } from "../../products/product.dto";
import { IColor } from "../../color/color.types";
import { ICategory } from "../../category/category.types";
import ColorService from "../../color/color.service";
import CategoryService from "../../category/category.service";
import ProductService from "../../products/product.service";
import BuyAndSellService from "../../buy-sell/buy-sell.service";
import SellerService from "../../seller/seller.service";
import { ISeller } from "../../seller/seller.types";
import { CookieNames } from "../../../common/constant/public.enum";
import { StatusCodes } from "http-status-codes";
import { AuthorizationMessage } from "../../../common/messages/auth.message";
import { verifyToken } from "../../../common/utils/functions";
import { Authorization } from "../../../common/guard/authorization.guard";
import createHttpError from "http-errors";
import { UserModel } from "../../auth/auth.model";

export class AuthController {
  private colorService = ColorService;
  private categoryService = CategoryService;
  private sellerService = SellerService;
  private productService = ProductService;
  private buyAndSellService = BuyAndSellService;
  constructor() {
    autoBind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.layout = "./layouts/auth/main.ejs";

      res.render("./pages/auth/login.ejs", {
        pageInfo: { pathUrl: "/auth/login", pathTitle: "ورود" },
        page: "login",
        apiUrl: process.env.API_URL,
      });
    } catch (error) {
      next(error);
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req?.cookies?.access_token;
      if (token) {
        const data = await verifyToken(token);
        if (typeof data === "object" && "id" in data) {
          const user = await UserModel.findById(data.id, { password: 0 }).lean();
          if (user) res.redirect("/panel/products");
        }
      }

      res.locals.layout = "./layouts/auth/main.ejs";
      res.render("./pages/auth/register.ejs", { page: "register", pageInfo: { pathUrl: "/auth/register", pathTitle: "ثبت نام" }, apiUrl: process.env.API_URL });
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(CookieNames.AccessToken);
      req.flash("success", "خروج با موفقیت انجام شد");
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  }
}
