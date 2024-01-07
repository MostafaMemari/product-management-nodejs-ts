import { Router } from "express";
import { DashbaordController } from "./dashbaord.controller";

const router: Router = Router();
const dashbaordController = new DashbaordController();

router.get("/main", dashbaordController.main);
router.get("/buy", dashbaordController.buy);
router.get("/sell", dashbaordController.sell);
router.get("/robot", dashbaordController.robot);
router.get("/products", dashbaordController.products);

export default router;
