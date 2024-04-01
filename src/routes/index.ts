import { Router } from "express";
import authRouter from "@/routes/router.auth";
import userRouter from "@/routes/routes.user";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

export default router;
