import { Faculty } from './faculty.model';

const findLastFacultyId = async () => {
  const lastUserId = await Faculty.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUserId?.id;
};

export const generateFacultyId = async () => {
  const currentUserId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  const incrementId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');
  return incrementId;
};
//
