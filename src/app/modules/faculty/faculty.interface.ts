import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type facultyGender = 'male' | 'female';
export type facultyBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type facultyDesignation = 'Professor' | 'Lecturer';

export type IFaculty = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: facultyGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: facultyBloodGroup;
  designation: facultyDesignation;
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
export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
