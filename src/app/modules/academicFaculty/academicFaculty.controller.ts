import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyService } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFaculty } = req.body;
    const result =
      await academicFacultyService.createAcademicFaculty(academicFaculty);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicFaculty created successfully',
      data: result,
    });
    // next();
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
};
