import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
// import studentController from './student.controller';
import { StudentZodValidation } from './student.validation';
import studentController from './student.controller';
const router = express.Router();

router.get('/', studentController.getAllStudent);
router.get('/:id', studentController.getSingleStudent);
router.patch(
  '/:id',
  validationRequest(StudentZodValidation.updateStudentZodValidation),
  studentController.updateSingleStudent
);

export const StudentRoutes = router;
