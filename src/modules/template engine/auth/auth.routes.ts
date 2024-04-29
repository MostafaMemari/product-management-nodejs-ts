import { Router } from "express";
import { AuthController } from "./auth.controller";
import { redirectLoginUser } from "../../../common/guard/redirectUser";

const router: Router = Router();
const authController = new AuthController();

router.get("/login", redirectLoginUser, authController.login);
router.get("/register", redirectLoginUser, authController.register);
router.get("/logout", authController.logout);

export default router;
