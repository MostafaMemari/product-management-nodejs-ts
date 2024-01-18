import { Router } from "express";
import { BuyAndSellController } from "./buy-sell.controller";

const router: Router = Router();
const buyAndSellController = new BuyAndSellController();

router.post("/product/:id/buy", buyAndSellController.buy);
router.post("/product/:id/sell", buyAndSellController.sell);

router.get("/product/:id/report/buy", buyAndSellController.reportBuy);
router.get("/product/:id/report/sell", buyAndSellController.reportSell);

export default router;
