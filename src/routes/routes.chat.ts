import { verifySession } from "@/controllers/controller.auth";
import {
  getChatController,
  getUserChatsController,
  sendMessageController,
} from "@/controllers/controller.chat";
import { Router } from "express";

const router = Router();

router.get("/", verifySession, getUserChatsController);
router.get("/:chatRoomId", verifySession, getChatController);
router.post("/:chatRoomId/send", verifySession, sendMessageController);

export default router;
