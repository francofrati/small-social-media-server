import { Router } from "express";

import authRouter from "@/routes/router.auth";
import userRouter from "@/routes/routes.user";
import feedRoutes from "@/routes/routes.feed";
import postRouter from '@/routes/routes.post'

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/feed", feedRoutes);

router.use('/post', postRouter);

export default router;
