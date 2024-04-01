import { Router } from "express";

import { loginController } from "@/controllers/controller.auth";

const router = Router();

router.post("/login", loginController);

export default router;