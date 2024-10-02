import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.services';
import pick from '../../../shared/pick';
import { filterableFields } from './managementDepartment.constant';
import { IPagination } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constatnt/pagination';
import { IManagementDepartment } from './managementDepartment.interface';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const department = req.body;
    const result =
      await ManagementDepartmentService.createManagementDepartment(department);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, filterableFields);
    const paginationOptions: IPagination = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filter,
      paginationOptions
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: '',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single semester data retrieved successfully',
      data: result,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student data updated successfully',
      data: result,
    });
  }
);

export default {
  // getAllStudent,
  // getSingleStudent,
  // updateSingleStudent,
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
};
