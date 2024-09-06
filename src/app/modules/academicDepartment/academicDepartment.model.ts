import { Schema, model } from 'mongoose';
import {
  academicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const academicFacultySchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
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

export const academicDepartment = model<
  IAcademicDepartment,
  academicDepartmentModel
>('academic-department', academicFacultySchema);
