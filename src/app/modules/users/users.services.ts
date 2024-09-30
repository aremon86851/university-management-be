import mongoose from 'mongoose';
import config from '../../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';
import { Student } from '../student/student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
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
    newUserAllData = await User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
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
  singleUser,
};
