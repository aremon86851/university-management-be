import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

export const AdminSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    bloodGroup: { type: String },
    profileImage: { type: String },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'management-department',
    },
    designation: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
