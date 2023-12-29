import { Router } from "express";
import { BuyAndSellController } from "./buy-sell.controller";

const router: Router = Router();
const buyAndSellController = new BuyAndSellController();

router.post("/", buyAndSellController.create);

export default router;
