import type {Request,Response} from 'express'
import {getUserService} from '../services/user.service.js'

export const userController = (req:Request, res:Response)=>{
    const user = getUserService();

    res.json(user);
}