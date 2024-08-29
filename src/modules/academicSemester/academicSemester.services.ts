import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { academicSemesterTitlesMapper } from './academicSemester.constant';
import { IAcademicSemester, IFiltered } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPagination, IPaginationResponse } from '../../interfaces/pagination';
import paginationHelpers from '../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  semester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitlesMapper[semester.title] !== semester.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code !');
  }
  const createdUser = await AcademicSemester.create(semester);
  if (!createdUser) {
    throw new Error('Could not create semester');
  }
  return createdUser;
};

const getAllSemesters = async (
  filter: IFiltered,
  pagination: IPagination
): Promise<IPaginationResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filteredData } = filter;

  const targetedFieldForSearch = ['title', 'code', 'year'];
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

  const result = await AcademicSemester.find(conditionForFilteredData)
    .sort(sortData)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const findById = await AcademicSemester.findById(id);
  return findById;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload?.title &&
    payload?.code &&
    academicSemesterTitlesMapper[payload?.title] !== payload?.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code !');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
