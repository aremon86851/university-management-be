import { Model, Types } from 'mongoose';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

type bloodGroups = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

type name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: name;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: bloodGroups;
  guardian: guardian;
  localGuardian: localGuardian;
  profileImage?: string;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type IFiltered = {
  searchTerm?: string;
  bloodGroup?: string;
  id?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
