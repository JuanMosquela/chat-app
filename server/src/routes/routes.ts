import { Router } from "express";
const router = Router();
import authRouter from "./auth.route";
import conversationRouter from "./conversation.route";
import messageRouter from "./message.route";

router.use("/auth", authRouter);
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);

export { router as genericRouter };
