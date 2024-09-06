import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentZodValidation } from './academicDepartment.validation';
const AcademicDepartment = express.Router();

AcademicDepartment.post(
  '/create-department',
  validationRequest(
    academicDepartmentZodValidation.createAcademicDepartmentZodValidation
  ),
  academicDepartmentController.createAcademicDepartment
);

export default AcademicDepartment;
