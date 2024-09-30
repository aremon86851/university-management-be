import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.services';

const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...faculty } = req.body;
    const result = await FacultyService.createFaculty(faculty);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
    next();
  }
);
const getASingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.singleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getASingleFaculty,
};
