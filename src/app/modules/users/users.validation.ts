import { z } from 'zod';
import { bloodGroups } from '../student/student.constant';

const createStudentZodValidation = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required' }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
      email: z.string({ required_error: 'Email is required' }),
      contactNo: z.string({ required_error: 'Contact No is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      presentAddress: z.string({
        required_error: ' Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      bloodGroup: z
        .enum([...bloodGroups] as [string, ...string[]], {
          required_error: 'Blood Group is required',
        })
        .optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father Name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is required',
        }),
        motherName: z.string({ required_error: 'Mother Name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Name is required' }),
        occupation: z.string({ required_error: 'Occupation is required' }),
        contactNo: z.string({ required_error: 'Contact no is required' }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      profileImage: z.string().optional(),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});
export const UserZodValidation = {
  createStudentZodValidation,
};
