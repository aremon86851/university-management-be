/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import paginationHelpers from '../../../helpers/paginationHelpers';
import {
  IPagination,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { IFaculty, IFiltered } from './faculty.interface';
import { Faculty } from './faculty.model';
import { generateFacultyId } from './faculty.utils';

const getAllFaculty = async (
  filter: IFiltered,
  pagination: IPagination
): Promise<IPaginationResponse<IFaculty[]>> => {
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

  const result = await Faculty.find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const createFaculty = async (faculty: IFaculty): Promise<IFaculty | null> => {
  // Auto generated id
  const id = await generateFacultyId();
  faculty.id = id;

  // Auto generated password
  // if (!faculty.password) {
  //   faculty.password = config.default_user_pass as string;
  // }

  const createdFaculty = (await Faculty.create(faculty)).populate([
    'academicDepartment',
    'academicFaculty',
  ]);
  if (!createdFaculty) {
    throw new Error('Could not create faculty');
  }
  return createdFaculty;
};

const singleFaculty = async (id: string): Promise<IFaculty | null> => {
  const finFacultyById = await Faculty.findById(id).populate([
    'academicFaculty',
    'academicDepartment',
  ]);
  if (!finFacultyById) {
    throw new Error('Could not find user');
  }
  return finFacultyById;
};
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const FacultyService = {
  getAllFaculty,
  createFaculty,
  singleFaculty,
  updateFaculty,
};
