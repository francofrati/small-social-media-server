import { verifySession } from "@/controllers/controller.auth";
import { getUserChatsController } from "@/controllers/controller.chat";
import { Router } from "express";

const router = Router();

router.get("/", verifySession, getUserChatsController);

export default router;
