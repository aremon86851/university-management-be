/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IPagination,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import paginationHelpers from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IFiltered, IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (
  filter: IFiltered,
  pagination: IPagination
): Promise<IPaginationResponse<IStudent[]>> => {
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

  const result = await Student.find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const findById = await Student.findById(id);
  return findById;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const { localGuardian, guardian, name, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach((item) => {
      const localGuardianKey = `localGuardian.${item}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[item as keyof typeof localGuardian];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((item) => {
      const guardianKey = `guardian.${item}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[item as keyof typeof name];
    });
  }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((item) => {
      const nameKey = `name.${item}`;
      (updatedStudentData as any)[nameKey] = name[item as keyof typeof name];
    });
  }
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};
export const StudentService = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
};
