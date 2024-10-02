import { z } from 'zod';
import { FacultyGenders } from '../faculty/faculty.constant';
import { FacultyGroup } from '../faculty/faculty.model';

const updateAdminZodValidation = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  gender: z.enum([...FacultyGenders] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.enum([...FacultyGroup] as [string, ...string[]]).optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  designation: z.string().optional(),
  profileImage: z.string().optional(),
  managementDepartment: z.string().optional(),
});

export const AdminZodValidation = {
  updateAdminZodValidation,
};
