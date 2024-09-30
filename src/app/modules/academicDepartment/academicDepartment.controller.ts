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
const getASingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicDepartmentService.findAAcademicDepartment(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department get successfully',
      data: result,
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getASingleAcademicDepartment,
};
