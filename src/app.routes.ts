import { Router } from "express";
import productRouter from "./modules/product/product.routes";
import colorRouter from "./modules/color/color.routes";

const AllRouter: Router = Router();

AllRouter.use("/products", productRouter);
AllRouter.use("/colors", colorRouter);

export { AllRouter };
