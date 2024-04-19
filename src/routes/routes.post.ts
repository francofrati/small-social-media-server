import { Router } from "express";

import { commentPostController, getPostCommentsController } from '@/controllers/constroller.post'
import { verifySession } from "@/controllers/controller.auth";

const router = Router()

router.post('/comment', verifySession, commentPostController)

router.get('/:postId/comments', verifySession, getPostCommentsController)

export default router