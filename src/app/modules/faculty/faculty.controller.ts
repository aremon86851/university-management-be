import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.services';
import pick from '../../../shared/pick';
import { filterableFields } from './faculty.constant';
import { IPagination } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constatnt/pagination';
import { IFaculty } from './faculty.interface';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, filterableFields);
  const paginationOptions: IPagination = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculty(filter, paginationOptions);
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '',
    meta: result.meta,
    data: result.data,
  });
});

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
const updateSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const facultyController = {
  createFaculty,
  getASingleFaculty,
  getAllFaculty,
  updateSingleFaculty,
};
