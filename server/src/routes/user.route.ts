import { Router } from "express";
import { editUser, getAllUsers, getUser } from "../controllers/user.controller";
import verifyToken from "../middlewares/verify-token";
const router = Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);
router.put("/", verifyToken, editUser);

export default router;
