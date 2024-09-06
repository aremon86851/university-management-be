import { z } from 'zod';

const createAcademicDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    academicFaculty: z.string({
      required_error: 'AcademicFaculty ID is required',
    }),
  }),
});

export const academicDepartmentZodValidation = {
  createAcademicDepartmentZodValidation,
};
