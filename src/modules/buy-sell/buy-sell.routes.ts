import { Router } from "express";
import { BuyAndSellController } from "./buy-sell.controller";

const router: Router = Router();
const buyAndSellController = new BuyAndSellController();

router.post("/product/:id/buy", buyAndSellController.buyAndSell);
router.post("/product/:id/sell", buyAndSellController.buyAndSell);
router.post("/product/:id/depo", buyAndSellController.buyAndSell);

export default router;
