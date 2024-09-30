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

const findAAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const findById = await academicDepartment
    .findById(id)
    .populate('academicFaculty');
  if (!findById) throw new Error('Could not findademic department');
  return findById;
};

export const academicDepartmentService = {
  createAcademicDepartment,
  findAAcademicDepartment,
};
