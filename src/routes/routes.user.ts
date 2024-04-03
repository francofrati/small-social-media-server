import { Router } from "express";

import { serveUserInfoController, serveUserContactsController } from "@/controllers/controller.user";
import { verifySession } from "@/controllers/controller.auth";

const router = Router();

router.get("/info", verifySession, serveUserInfoController);

router.get("/contacts", verifySession, serveUserContactsController)

export default router;
