import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicDepartmentService } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicDepartment } = req.body;
    const result =
      await academicDepartmentService.createAcademicDepartment(
        academicDepartment
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
    next();
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
};
