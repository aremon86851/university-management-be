import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.model';

const findLastStudentId = async () => {
  const lastUserId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUserId?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentUserId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');
  incrementId = `${academicSemester?.year?.substring(2)}${academicSemester?.code}${incrementId}`;
  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFacultyId?.id ? lastFacultyId?.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentFacultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

//
