import { z } from 'zod';

const createUserZodValidation = z.object({
  body: z.object({
    role: z.string({ required_error: 'Role is required' }),
  }),
});

export const UserZodValidation = {
  createUserZodValidation,
};
