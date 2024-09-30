import { Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { Model } from 'mongoose';

export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  department: Types.ObjectId | IAcademicDepartment;
  designation: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
