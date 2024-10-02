import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IPagination } from '../../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constatnt/pagination';
import { filterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.services';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, filterableFields);
  const paginationOptions: IPagination = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filter, paginationOptions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single admin data update successfully',
    data: result,
  });
});
const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateAdmin(id, updatedData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data updated successfully',
    data: result,
  });
});

export default {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
};
