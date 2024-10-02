/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IFiltered,
  IManagementDepartment,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
import {
  IPagination,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import paginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createManagementDepartment = async (
  department: IManagementDepartment
): Promise<IManagementDepartment | null> => {
  const createDepartment = await ManagementDepartment.create(department);
  if (!createDepartment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not create department');
  }
  return createDepartment;
};

const getAllManagementDepartment = async (
  filter: IFiltered,
  pagination: IPagination
): Promise<IPaginationResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filteredData } = filter;

  const targetedFieldForSearch = ['title'];
  const searchItems = [];

  if (searchTerm) {
    searchItems.push({
      $or: targetedFieldForSearch.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filteredData).length > 0) {
    searchItems.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers(pagination);
  const sortData: {
    [key: string]: SortOrder;
  } = {};
  if (sortBy && sortOrder) {
    sortData[sortBy] = sortOrder;
  }

  const conditionForFilteredData =
    searchItems.length > 0 ? { $and: searchItems } : {};

  const result = await ManagementDepartment.find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const findById = await ManagementDepartment.findById(id);
  return findById;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
export const ManagementDepartmentService = {
  // getAllStudent,
  // getSingleStudent,
  // updateStudent,
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
};
