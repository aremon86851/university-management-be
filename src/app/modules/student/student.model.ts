import { model, Schema } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';
import { bloodGroups } from './student.constant';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String },
      },
      required: true,
    },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true }, // Email validation
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: bloodGroups }, // Ensure bloodGroups is defined/imported
    guardian: {
      type: {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: true,
    },
    localGuardian: {
      type: {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: { type: String, required: true },
      },
      required: false, // Explicitly marking it as optional
    },
    profileImage: {
      type: String,
      // required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academic-semesters',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academic-department',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic-faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
