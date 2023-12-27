import { Router } from "express";
import { ProductController } from "./product.controller";

const router: Router = Router();
const productController = new ProductController();

router.post("/", productController.createProduct);
router.get("/", productController.getProdcuts);
router.get("/:id", productController.getProdcut);

export default router;
