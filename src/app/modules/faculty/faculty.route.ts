import express from 'express';
import { facultyController } from './faculty.controller';
import { FacultyZodValidation } from './faculty.validation';
import validationRequest from '../../middlewares/validationRequest';
const Faculty = express.Router();

Faculty.get('/', facultyController.getAllFaculty);
Faculty.get('/:id', facultyController.getASingleFaculty);
Faculty.patch(
  '/:id',
  validationRequest(FacultyZodValidation.updateFacultyZodValidation),
  facultyController.updateSingleFaculty
);
export default Faculty;
