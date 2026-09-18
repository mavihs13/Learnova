import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../generated/prisma/client.js';
 import 'dotenv/config';

 const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
 })

 const prisma = new PrismaClient({
    adapter
 })

 export const findUserByEmail = async (email: string)=>{
    return await prisma.users.findUnique({
        where:{
            email:email
        }
    })
 }

 export const createUser = async (name:string, email:string, passwordHash:string)=>{
    return await prisma.users.create({
        data:{
            name:name,
            email:email,
            password_hash:passwordHash
        },
        select:{
            id:true,
            name:true,
            email:true,
            email_verified:true,
            is_active:true,
            created_at:true,
            updated_at:true
        }
    })
 }


 export const findUserForLogin = async (email:string)=>{
    return await prisma.users.findUnique({
        where:{
            email:email
        },
        select:{
            id:true,
            name:true,
            email:true,
            password_hash:true,
            email_verified:true,
            is_active:true
        }
    })
 }