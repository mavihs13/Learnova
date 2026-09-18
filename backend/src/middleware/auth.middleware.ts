import type {Request , Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    user?:{
        userId:number,
        email:string
    }
}

export const authMiddleware = (req:AuthRequest, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:'Authentication required'
        })
    }

    const [scheme, token] = authHeader.split(' ');
    if(scheme !== 'Bearer' || !token){
        return res.status(401).json({
            message:'Invalid authorization format'
        })
    }

    const secret = process.env.JWT_SECRET;
    if(!secret){
        return res.status(500).json({
            message:'JWT secret not defined'
        })
    }

    try{

        const payload = jwt.verify(token, secret);
        if (
            typeof payload !== 'object' ||
            payload === null ||
            typeof payload.userId !== 'number' ||
            typeof payload.email !== 'string'
        ) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        req.user = {
            userId: payload.userId,
            email: payload.email
        };

        next();

    }catch(error){
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}