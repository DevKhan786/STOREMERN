import express from "express";
import { signupController } from "../controllers/auth.controller.js";
import { loginController } from "../controllers/auth.controller.js";
import { logoutController } from "../controllers/auth.controller.js";
import { refreshToken } from "../controllers/auth.controller.js";
import { getProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/refresh-token", refreshToken);

router.get("/profile", getProfile);

export default router;
