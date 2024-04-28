import { Router } from "express";
import { ProductController, ProductControllerEJS } from "./product.controller";
import upload from "../../common/utils/multer";

const router: Router = Router();

const productController = new ProductController();
const productControllerEjs = new ProductControllerEJS();

router.get("/report/:buyAndSell", productController.findAllProductAndSumSellBuy);

router.post("/form", upload.single("img"), productControllerEjs.create);
router.post("/:id/form", upload.single("img"), productControllerEjs.update);

router.route("/").post(upload.single("img"), productController.create).get(productController.find);
router.route("/:id").put(upload.single("img"), productController.update).get(productController.findByID).delete(productController.removeByID);

router.put("/:id/robot", productController.updateRobot);

export default router;
