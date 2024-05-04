import { Router } from "express";

import {
  commentPostController,
  getPostCommentsController,
  getPostLikesController,
  likePostController,
} from "@/controllers/constroller.post";
import { verifySession } from "@/controllers/controller.auth";

const router = Router();

router.post("/comment", verifySession, commentPostController);

router.post("/like", verifySession, likePostController);

router.get("/:postId/comments", verifySession, getPostCommentsController);

router.get("/:postId/likes", verifySession, getPostLikesController);

export default router;
