import { Router } from "express";
const router = Router();
import authRouter from "./auth.route";

router.use("/auth", authRouter);

export { router as genericRouter };
