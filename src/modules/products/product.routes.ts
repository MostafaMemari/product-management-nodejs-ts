import { Router } from "express";
import { ProductController } from "./product.controller";
import upload from "../../common/utils/multer";

const router: Router = Router();
const productController = new ProductController();

router.put("/:id/robot", productController.updateRobot);

router.post("/:id", upload.single("img"), productController.update);

router.post("/", upload.single("img"), productController.create);
router.get("/", productController.find);
router.get("/:id", productController.findByID);
router.delete("/:id", productController.removeByID);

export default router;
