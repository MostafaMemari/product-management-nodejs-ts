import { Router } from "express";
import { ColorController } from "./color.controller";

const router: Router = Router();
const colorController = new ColorController();

router.post("/", colorController.create);
router.get("/", colorController.find);
router.get("/:id", colorController.findByID);
router.put("/:id", colorController.update);
router.delete("/:id", colorController.removeByID);

export default router;
