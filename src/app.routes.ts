import { Router } from "express";
import productRouter from "./modules/product/product.routes";
import colorRouter from "./modules/color/color.routes";
import categoryRouter from "./modules/category/category.routes";

const AllRouter: Router = Router();

AllRouter.use("/products", productRouter);
AllRouter.use("/colors", colorRouter);
AllRouter.use("/category", categoryRouter);

export { AllRouter };
