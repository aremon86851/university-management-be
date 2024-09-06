import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';
// import { generateAcademicFacultyId } from './academicFaculty.utils';

const createAcademicFaculty = async (
  academicFacultyData: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  // Auto generated id
  // const id = await generateAcademicFacultyId();
  // academicFacultyData?.id = id;

  // Auto generated password
  // if (!academicFaculty.password) {
  //   academicFaculty.password = config.default_user_pass as string;
  // }

  const createdAcademicFaculty =
    await academicFaculty.create(academicFacultyData);
  if (!createdAcademicFaculty) {
    throw new Error('Could not create academicFaculty');
  }
  return createdAcademicFaculty;
};

export const academicFacultyService = {
  createAcademicFaculty,
};
