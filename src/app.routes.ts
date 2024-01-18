import { Router } from "express";
import productRouter from "./modules/products/product.routes";
import colorRouter from "./modules/color/color.routes";
import categoryRouter from "./modules/category/category.routes";
import sellerRouter from "./modules/seller/seller.routes";
import authRouter from "./modules/auth/auth.routes";
import buyAndSellRouter from "./modules/buy-sell/buy-sell.routes";

const AllRouter: Router = Router();

AllRouter.use("/sellers", sellerRouter);
AllRouter.use("/auth", authRouter);
AllRouter.use("/products", productRouter);
AllRouter.use("/colors", colorRouter);
AllRouter.use("/category", categoryRouter);
AllRouter.use("/buy-sell", buyAndSellRouter);

export { AllRouter };
