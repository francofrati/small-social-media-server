import { Router } from "express";

import authRouter from "@/routes/router.auth";
import userRouter from "@/routes/routes.user";
import feedRoutes from "@/routes/routes.feed";
import postRouter from "@/routes/routes.post";
import chatRouter from "@/routes/routes.chat";

const router = Router();

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/feed", feedRoutes);

router.use("/post", postRouter);

router.use("/chat", chatRouter);

export default router;
