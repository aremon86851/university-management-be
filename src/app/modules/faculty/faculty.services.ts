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

export const FacultyService = {
  createFaculty,
  singleFaculty,
};
