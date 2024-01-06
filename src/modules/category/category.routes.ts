import { Router } from "express";
import { CategoryController } from "./category.controller";

const router: Router = Router();
const categoryController = new CategoryController();

router.post("/", categoryController.create);
router.get("/", categoryController.find);
router.put("/:id", categoryController.update);
router.delete("/:id/", categoryController.removeByID);
router.get("/:id", categoryController.findByID);

export default router;
