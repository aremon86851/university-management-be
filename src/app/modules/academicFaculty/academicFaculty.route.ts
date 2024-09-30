import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyZodValidation } from './academicFaculty.validation';
import validationRequest from '../../middlewares/validationRequest';

const AcademicFaculty = express.Router();

AcademicFaculty.get(
  '/:id',
  academicFacultyController.getASingleAcademicFaculty
);

AcademicFaculty.post(
  '/create-faculty',
  validationRequest(
    academicFacultyZodValidation.createAcademicFacultyZodValidation
  ),
  academicFacultyController.createAcademicFaculty
);

AcademicFaculty.get('/', academicFacultyController.getAllAcademicFaculty);

export default AcademicFaculty;
