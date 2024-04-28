import { Router } from "express";
import { PanelController } from "./products.controller";
import { Authorization } from "../../../common/guard/authorization.guard";
import { RobotController } from "./robot.controller";

const router: Router = Router();
const panelController = new PanelController();
const robotController = new RobotController();

router.get("/main", panelController.main);

router.get("/robot-control", robotController.robot);
router.get("/robot-history", robotController.history);

router.get("/products", panelController.products);

router.get("/products-buy", panelController.buy);
router.get("/products-sell", panelController.sell);
router.get("/products-defects", panelController.defects);
router.get("/sellers", panelController.sellers);
router.get("/category-color", panelController.categoryAndColor);

export default router;
