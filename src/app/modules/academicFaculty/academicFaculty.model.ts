import { Schema, model } from 'mongoose';
import {
  academicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const academicFaculty = model<IAcademicFaculty, academicFacultyModel>(
  'academic-faculty',
  academicFacultySchema
);
