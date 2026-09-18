import type {Request,Response} from 'express';

import {registerSchema,loginSchema} from '../schemas/auth.schema.js'
import {registerUser,loginUser} from '../services/auth.service.js'

export const registerController = async (req:Request,res:Response)=>{
    const result = registerSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:'Invalid register data',
            errors:result.error.flatten().fieldErrors
        })
    }
    try{

        const user  = await registerUser(result.data);

        return res.status(201).json({
            message:'User registered successfully',
            user:user
        })

    }catch(error){
        if (error instanceof Error && error.message === 'Email already registered') {
            return res.status(409).json({
                message: error.message
            });
        }

        console.error('Registration error:', error);

        return res.status(500).json({
           message: 'Internal server error'
        });
    }
}


export const loginController = async (req:Request, res:Response)=>{
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: 'Invalid login data',
            errors: result.error.flatten().fieldErrors
        });
    }

    try {

        const resultData = await loginUser(result.data);

        return res.status(200).json(resultData);

    } catch (error) {

        if (
            error instanceof Error &&
            error.message === 'Invalid email or password'
        ) {
            return res.status(401).json({
                message: error.message
            });
        }

        console.error('Login error:', error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}