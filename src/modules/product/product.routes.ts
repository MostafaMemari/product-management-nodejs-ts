import { Router } from "express";
import { ProductController } from "./product.controller";

const router: Router = Router();
const productController = new ProductController();

router.post("/create", productController.createProduct);

export default router;
