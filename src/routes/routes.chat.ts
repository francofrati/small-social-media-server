import { verifySession } from "@/controllers/controller.auth";
import {
  getChatController,
  getUserChatsController,
} from "@/controllers/controller.chat";
import { Router } from "express";

const router = Router();

router.get("/", verifySession, getUserChatsController);
router.get("/:chatRoomId", verifySession, getChatController);

export default router;
