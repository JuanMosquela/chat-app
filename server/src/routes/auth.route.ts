import { Router } from "express";
import { googleLogin, login, register } from "../controllers/auth.controller";
import loginValidator from "../validators/login.validator";
import { validationGeneral } from "../validators/validation-result";
import googleValidator from "../validators/google.validator";

const router = Router();

router.post("/register", register);
router.post("/login", loginValidator, validationGeneral, login);
router.post("/google", googleValidator, validationGeneral, googleLogin);

export default router;
