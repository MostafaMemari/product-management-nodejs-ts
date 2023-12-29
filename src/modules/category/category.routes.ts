import { Router } from "express";
import { CategoryController } from "./category.controller";

const router: Router = Router();
const categoryController = new CategoryController();

router.post("/", categoryController.create);
router.get("/", categoryController.find);
router.get("/:id", categoryController.findByID);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.removeByID);

export default router;
