/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { UserService } from './users.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import pick from '../../../shared/pick';
// import { filterableFields } from './users.constant';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...user } = req.body;
    const result = await UserService.createStudent(student, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
    next();
  }
);

const getASingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.singleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  });
  // next();
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // const filter = pick(req.query, filterableFields);
  // const result = await UserService.singleUser(id);
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'User get successfully',
  //   data: result,
  // });
  // next();
});

export const usersController = {
  createStudent,
  getASingleUser,
  getAllUsers,
};
