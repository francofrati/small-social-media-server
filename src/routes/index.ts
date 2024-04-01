import { Router } from "express";
import authRouter from "@/routes/router.auth";

const router = Router();

router.use("/auth", authRouter);

export default router;
