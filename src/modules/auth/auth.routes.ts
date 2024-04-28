import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Authorization } from "../../common/guard/authorization.guard";

const router: Router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/getMe", Authorization, authController.getMe);

export default router;
