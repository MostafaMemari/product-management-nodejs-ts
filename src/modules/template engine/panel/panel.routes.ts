import { Router } from "express";
import { PanelController } from "./products.controller";
import { Authorization } from "../../../common/guard/authorization.guard";
import { RobotController } from "./robot.controller";

const router: Router = Router();
const panelController = new PanelController();
const robotController = new RobotController();

router.get("/", panelController.main);

router.get("/panel/robot-control", robotController.robot);
router.get("/panel/robot-history", robotController.history);

router.get("/panel/products", panelController.products);

router.get("/panel/products-buy", panelController.buy);
router.get("/panel/products-sell", panelController.sell);

router.get("/panel/sellers", panelController.sellers);
router.get("/panel/category-color", panelController.categoryAndColor);

export default router;
