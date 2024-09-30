import { z } from 'zod';
import { FacultyGenders } from './faculty.constant';
import { FacultyDesignation, FacultyGroup } from './faculty.model';

const createFacultyZodValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required' }),
    }),
    gender: z.enum([...FacultyGenders] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
    email: z.string({ required_error: 'Date of Birth is required' }),
    contactNo: z.string({ required_error: 'Date of Birth is required' }),
    emergencyContactNo: z.string({
      required_error: 'Date of Birth is required',
    }),
    presentAddress: z.string({ required_error: 'Date of Birth is required' }),
    permanentAddress: z.string({ required_error: 'Date of Birth is required' }),
    bloodGroup: z.enum([...FacultyGroup] as [string, ...string[]], {
      required_error: 'Date of Birth is required',
    }),
    designation: z.enum([...FacultyDesignation] as [string, ...string[]], {
      required_error: 'Date of Birth is required',
    }),
    academicDepartment: z.string({ required_error: 'Department is required' }),
    academicFaculty: z.string({ required_error: 'Faculty is required' }),
  }),
});

export const FacultyZodValidation = {
  createFacultyZodValidation,
};
