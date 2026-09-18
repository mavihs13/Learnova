import { z } from 'zod';

export const userIdSchema = z.coerce.number().int().positive();