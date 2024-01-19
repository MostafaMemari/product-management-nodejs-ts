import { Router } from "express";
import { PanelController } from "./panel.controller";
import { Authorization } from "../../../common/guard/authorization.guard";

const router: Router = Router();
const panelController = new PanelController();

router.get("/main", panelController.main);

router.get("/robot-control", panelController.robot);
router.get("/products", panelController.products);
router.get("/products-buy", panelController.buy);
router.get("/products-sell", panelController.sell);
router.get("/products-defects", panelController.defects);
router.get("/sellers", panelController.sellers);
router.get("/category-color", panelController.categoryAndColor);

export default router;
