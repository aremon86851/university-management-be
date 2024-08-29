import { NextFunction, Request, Response } from 'express';
import { AcademicService } from './academicSemester.services';
import catchAsync from '../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import { IPagination } from '../../interfaces/pagination';
import pick from '../../shared/pict';
import { paginationFields } from '../../constatnt/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { filterableFields } from './academicSemester.constant';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicData } = req.body;
    const result = await AcademicService.createSemester(academicData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
    next();
  }
);

const getAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter = pick(req.query, filterableFields);
    const paginationOptions: IPagination = pick(req.query, paginationFields);
    const result = await AcademicService.getAllSemesters(
      filter,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: '',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicService.getSingleSemester(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single semester data retrieved successfully',
      data: result,
    });
    next();
  }
);
const updateSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicService.updateSemester(id, updatedData);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester data updated successfully',
      data: result,
    });
    next();
  }
);

export default {
  createSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateSingleSemester,
};
