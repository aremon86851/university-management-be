import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  dateOfBirth: string;
  email: string;
  contactNo: string;
  gender: 'male' | 'female';
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: string;
  profileImage?: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
};
export type IFiltered = {
  searchTerm?: string;
  bloodGroup?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
