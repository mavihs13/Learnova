import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import type { userDTO } from '../schemas/user.dto.js';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});

export const getUser = async (id: number): Promise<userDTO | null> => {
    const user = await prisma.users.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            email_verified: true,
            is_active: true,
            created_at: true,
            updated_at: true
        }
    });

    return user;
};