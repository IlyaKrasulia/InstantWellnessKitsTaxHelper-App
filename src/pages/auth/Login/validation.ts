import { z } from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
});

export type AuthFormData = z.infer<typeof authSchema>;