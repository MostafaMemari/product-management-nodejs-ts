import { Router } from "express";
import { ProductController } from "./product.controller";

const router: Router = Router();
const productController = new ProductController();

router.post("/:id", productController.update);

router.post("/", productController.create);
router.get("/", productController.find);
router.get("/:id", productController.findByID);
router.delete("/:id", productController.removeByID);

export default router;
