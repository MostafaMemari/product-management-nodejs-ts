import { Router } from "express";
import { SellerController, SellerControllerEJS } from "./seller.controller";
import upload from "../../common/utils/multer";

const router: Router = Router();
const sellerController = new SellerController();
const sellerControllerEJS = new SellerControllerEJS();

router.route("/").post(sellerController.create).get(sellerController.find);
router.route("/:id").put(sellerController.update).delete(sellerController.removeByID).get(sellerController.findByID);

router.post("/form", sellerControllerEJS.create);
router.post("/:id/form", sellerControllerEJS.update);

export default router;
