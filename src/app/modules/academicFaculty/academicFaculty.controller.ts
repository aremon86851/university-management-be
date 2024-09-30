import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyService } from './academicFaculty.services';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constatnt/pagination';
import { IPagination } from '../../../interfaces/pagination';

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

const getASingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyService.findAcademicFaculty(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicFaculty get successfully',
      data: result,
    });
    // next();
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ['searchTerm', 'title']);
    const paginationOptions: IPagination = pick(req.query, paginationFields);
    const result = await academicFacultyService.getAcademicFaculty(
      filter,
      paginationOptions
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicFaculty get successfully',
      data: result,
    });
    // next();
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getASingleAcademicFaculty,
  getAllAcademicFaculty,
};
