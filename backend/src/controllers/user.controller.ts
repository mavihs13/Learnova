import type { Request, Response } from 'express';
import { getUserService } from '../services/user.service.js';
import { userIdSchema } from '../schemas/user.schema.js';

export const userController = async (req: Request, res: Response) => {
    const result = userIdSchema.safeParse(req.params.id);

    if (!result.success) {
        return res.status(400).json({
            message: 'Invalid user ID'
        });
    }

    const id = result.data;

    const user = await getUserService(id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    res.json(user);
};