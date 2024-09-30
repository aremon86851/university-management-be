import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IPagination } from '../../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constatnt/pagination';
import { IStudent } from './student.interface';
import { filterableFields } from './student.constant';
import { StudentService } from './student.services';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  console.log('student');
  const filter = pick(req.query, filterableFields);
  const paginationOptions: IPagination = pick(req.query, paginationFields);
  const result = await StudentService.getAllStudent(filter, paginationOptions);
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester data retrieved successfully',
    data: result,
  });
});
const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data updated successfully',
    data: result,
  });
});

export default {
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
};
