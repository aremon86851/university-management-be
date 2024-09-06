import { academicFaculty } from './academicFaculty.model';

const findLastAcademicFacultyId = async () => {
  const lastUserId: {
    id: string;
  } | null = await academicFaculty
    .findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUserId?.id;
};

export const generateAcademicFacultyId = async () => {
  const currentUserId =
    (await findLastAcademicFacultyId()) || (0).toString().padStart(5, '0');
  const incrementId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');
  return incrementId;
};
//
