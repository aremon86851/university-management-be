import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (
  academicDepartmentData: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const createdAcademicDepartment = (
    await academicDepartment.create(academicDepartmentData)
  ).populate('academicFaculty');
  if (!createdAcademicDepartment) {
    throw new Error('Could not create academic department');
  }
  return createdAcademicDepartment;
};

export const academicDepartmentService = {
  createAcademicDepartment,
};
