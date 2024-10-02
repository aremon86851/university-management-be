import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './users.interface';
import { User } from './users.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IStudent | null> => {
  // Auto generated password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'student';
  const findAcademicSemester = await AcademicSemester.findById(
    student?.academicSemester
  );

  // Auto generated id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const id = await generateStudentId(findAcademicSemester);
    user.id = id;
    student.id = id;
    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Student created not successfully'
      );
    }
    //Make student _id to user student ref
    user.student = createStudent[0]._id;
    const createUser = await User.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User created not successfully'
      );
    }
    newUserAllData = createUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Operations is failed: ${error}`
    );
  }

  if (newUserAllData) {
    newUserAllData = await Student.findOne({
      id: newUserAllData.id,
    })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
  }
  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IFaculty | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'faculty';
  // Auto generated id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const createFaculty = await Faculty.create([faculty], { session });
    if (!createFaculty.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Faculty created not successfully'
      );
    }
    //Make student _id to user student ref
    user.faculty = createFaculty[0]._id;
    const createUser = await User.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User created not successfully'
      );
    }
    newUserAllData = createUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Operations is failed: ${error}`
    );
  }
  if (newUserAllData) {
    newUserAllData = await Faculty.findOne({
      id: newUserAllData.id,
    })
      .populate('academicDepartment')
      .populate('academicFaculty');
  }
  // console.log(newUserAllData);
  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IAdmin | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'admin';
  // Auto generated id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const createAdmin = await Admin.create([admin], { session });
    if (!createAdmin.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Admin created not successfully'
      );
    }
    //Make student _id to user student ref
    user.faculty = createAdmin[0]._id;
    const createUser = await User.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'User created not successfully'
      );
    }
    newUserAllData = createUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Operations is failed: ${error}`
    );
  }
  if (newUserAllData) {
    newUserAllData = await Admin.findOne({
      id: newUserAllData.id,
    }).populate('managementDepartment');
  }
  // console.log(newUserAllData);
  return newUserAllData;
};

const singleUser = async (id: string): Promise<IUser | null> => {
  const findByUserId = await User.findById(id);
  if (!findByUserId) {
    throw new Error('User could not find');
  }
  return findByUserId;
};

export const UserService = {
  createStudent,
  createFaculty,
  singleUser,
  createAdmin,
};
