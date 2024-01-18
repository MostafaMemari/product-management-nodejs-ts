import { Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = Router();
const authController = new AuthController();

router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/logout", authController.logout);

export default router;
