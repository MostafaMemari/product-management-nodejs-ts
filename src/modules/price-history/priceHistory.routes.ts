import { Router } from "express";
import { PriceHistoryController } from "./priceHistory.controller";

const router: Router = Router();
const priceHistoryController = new PriceHistoryController();

router.route("/").get(priceHistoryController.find);

export default router;
