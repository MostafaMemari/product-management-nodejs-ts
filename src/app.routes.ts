import { Router } from "express";
import productRouter from "./modules/product/product.routes";

const AllRouter: Router = Router();

AllRouter.use("/products", productRouter);

export { AllRouter };
