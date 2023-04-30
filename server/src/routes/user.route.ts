import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import verifyToken from "../middlewares/verify-token";
const router = Router();

router.get("/", verifyToken, getAllUsers);

export default router;
