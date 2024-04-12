import { verifySession } from "@/controllers/controller.auth";
import { getUserFeedController } from "@/controllers/controller.feed";
import { Router } from "express";

const router = Router();

router.get("/user", verifySession, getUserFeedController);

export default router;
