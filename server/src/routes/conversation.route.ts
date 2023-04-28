import { Router } from "express";
import {
  createConversation,
  getConversation,
} from "../controllers/conversation.controller";
const router = Router();

router.post("/", createConversation);
router.get("/:id", getConversation);

export default router;
