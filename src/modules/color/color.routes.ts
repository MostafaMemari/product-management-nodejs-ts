import { Router } from "express";
import { ColorController } from "./color.controller";

const router: Router = Router();
const colorController = new ColorController();

router.route("/").post(colorController.create).get(colorController.find);
router.route("/:id").put(colorController.update).get(colorController.findByID).delete(colorController.removeByID);

export default router;
