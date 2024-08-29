import { SortOrder } from 'mongoose';

type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IPaginationReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const paginationHelpers = (options: IPaginationOptions): IPaginationReturn => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export default paginationHelpers;
