import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { generateFacultyId } from './faculty.utils';

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

export const FacultyService = {
  createFaculty,
};
