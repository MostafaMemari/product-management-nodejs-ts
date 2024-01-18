import { Router } from "express";
import { CategoryController } from "./category.controller";

const router: Router = Router();
const categoryController = new CategoryController();

router.route("/").post(categoryController.create).get(categoryController.find);
router.route("/:id").put(categoryController.update).delete(categoryController.removeByID).get(categoryController.findByID);

export default router;
