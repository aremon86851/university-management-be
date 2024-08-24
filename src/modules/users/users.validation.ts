import { z } from 'zod';

const createUserZodValidation = z.object({
  body: z.object({
    role: z.string(),
    password: z.string().optional(),
  }),
});

export const UserZodValidation = {
  createUserZodValidation,
};
