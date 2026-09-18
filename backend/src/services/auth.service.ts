import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {findUserByEmail,createUser,findUserForLogin} from '../repositories/auth.repository.js'


import type {RegisterDTO,LoginDTO} from '../schemas/auth.schema.js'

export const registerUser = async (data : RegisterDTO)=>{
    const existingUser = await findUserByEmail(data.email);
    if(existingUser){
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUser(
        data.name, 
        data.email, 
        hashedPassword
    );

    return user;
}

export const loginUser = async (data:LoginDTO)=>{
    const user = await findUserForLogin(data.email);
    if(!user){
        throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password_hash ?? "");
    if(!passwordMatch){
        throw new Error('Invalid email or password');
    }

    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error('JWT secret not defined');
    }

    const accessToken = jwt.sign(
        {
            userId:user.id,
            email:user.email
        },
        secret,
        {
            expiresIn:'1h'
        }
    )
    return accessToken;
}