import { pool } from "@/db/config";
import { getUserIdByEmail } from "@/services/services.user";
import { getEmailFromSessionToken } from "@/utils/utils";
import { Request, Response } from "express";

export const commentPostController = async (req: Request, res: Response) => {
    try {
        const { postId, comment } = req.body

        const sessionToken = req.cookies["sessiontoken"]

        const userEmail = getEmailFromSessionToken(sessionToken)

        if (!userEmail) throw Error('Invalid user')

        const userId = await getUserIdByEmail(userEmail)

        await pool.query(`call commentPost(${postId}, ${userId}, '${comment}')`)

        res.send('ok')

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

export const getPostCommentsController = async (req: Request<{ postId: string }>, res: Response) => {
    try {
        const { postId } = req.params

        const { rows: comments } = await pool.query(`select * from getPostComments(${postId})`)

        res.send(comments)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}