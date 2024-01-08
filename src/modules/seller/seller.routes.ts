import { Router } from "express";
import { SellerController } from "./seller.controller";

const router: Router = Router();
const sellerController = new SellerController();

router.post("/", sellerController.create);

router.get("/", sellerController.find);
router.put("/:id", sellerController.update);
router.delete("/:id/", sellerController.removeByID);
router.get("/:id", sellerController.findByID);

export default router;
