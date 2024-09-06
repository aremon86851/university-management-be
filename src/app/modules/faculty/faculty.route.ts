import express from 'express';
import { facultyController } from './faculty.controller';
import { FacultyZodValidation } from './faculty.validation';
import validationRequest from '../../middlewares/validationRequest';
const Faculty = express.Router();

Faculty.post(
  '/create-faculty',
  validationRequest(FacultyZodValidation.createFacultyZodValidation),
  facultyController.createFaculty
);

export default Faculty;
