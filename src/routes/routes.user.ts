import { Router } from "express";

import { serveUserInfoController } from "@/controllers/controller.user";
import { verifySession } from "@/controllers/controller.auth";

const router = Router();

router.get("/info", verifySession, serveUserInfoController);

export default router;
