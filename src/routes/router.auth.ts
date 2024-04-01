import { Router } from "express";

import {
  loginController,
  verifySessionController,
} from "@/controllers/controller.auth";

const router = Router();

router.post("/login", loginController);

router.get("/verifySession", verifySessionController);

export default router;
