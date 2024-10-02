/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IPagination,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import paginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IAdmin, IFiltered } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  filter: IFiltered,
  pagination: IPagination
): Promise<IPaginationResponse<IAdmin[]>> => {
  const { searchTerm, ...filteredData } = filter;

  const targetedFieldForSearch = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
  ];
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

  const result = await Admin.find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const findById = await Admin.findById(id);
  return findById;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((item) => {
      const nameKey = `name.${item}`;
      (updatedAdminData as any)[nameKey] = name[item as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
  });
  return result;
};
export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};
