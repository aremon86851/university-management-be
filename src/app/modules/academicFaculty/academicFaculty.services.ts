import { SortOrder } from 'mongoose';
import paginationHelpers from '../../../helpers/paginationHelpers';
import {
  IPagination,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';
// import { generateAcademicFacultyId } from './academicFaculty.utils';

const createAcademicFaculty = async (
  academicFacultyData: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const createdAcademicFaculty =
    await academicFaculty.create(academicFacultyData);
  if (!createdAcademicFaculty) {
    throw new Error('Could not create academicFaculty');
  }
  return createdAcademicFaculty;
};

const findAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const findAcademicFacultyById = await academicFaculty.findById(id);
  if (!findAcademicFacultyById)
    throw new Error('Could not find Academic Faculty');
  return findAcademicFacultyById;
};

const getAcademicFaculty = async (
  filter: { searchTerm?: string },
  pagination: IPagination
): Promise<IPaginationResponse<IAcademicFaculty[]>> => {
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
  const result = await academicFaculty
    .find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await academicFaculty.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};
export const academicFacultyService = {
  createAcademicFaculty,
  findAcademicFaculty,
  getAcademicFaculty,
};
