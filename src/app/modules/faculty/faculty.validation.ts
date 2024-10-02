import { z } from 'zod';
import { FacultyGenders } from './faculty.constant';
import { FacultyDesignation, FacultyGroup } from './faculty.model';

const updateFacultyZodValidation = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
    })
    .optional(),
  gender: z.enum([...FacultyGenders] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z.enum([...FacultyGroup] as [string, ...string[]]).optional(),
  designation: z
    .enum([...FacultyDesignation] as [string, ...string[]])
    .optional(),
  academicDepartment: z.string().optional(),
  academicFaculty: z.string().optional(),
});

export const FacultyZodValidation = {
  updateFacultyZodValidation,
};
