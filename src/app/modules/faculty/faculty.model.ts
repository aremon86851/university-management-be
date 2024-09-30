import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

export const FacultyGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const FacultyDesignation = ['Professor', 'Lecturer'];
const facultySchema = new Schema<IFaculty>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false },
      lastName: { type: String, required: false },
    },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: FacultyGroup },
    designation: { type: String, required: true, enum: FacultyDesignation },
    academicDepartment: {
      type: String,
      ref: 'academic-department',
      required: true,
    },
    academicFaculty: {
      type: String,
      ref: 'academic-faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty, FacultyModel>('faculty', facultySchema);
