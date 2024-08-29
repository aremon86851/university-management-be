import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterZodValidation } from './academicSemester.validation';
import academicSemesterController from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(
    AcademicSemesterZodValidation.createAcademicSemesterZodValidation
  ),
  academicSemesterController.createSemester
);

router.get('/:id', academicSemesterController.getSingleAcademicSemester);
router.patch(
  '/:id',
  validationRequest(
    AcademicSemesterZodValidation.updateAcademicSemesterZodValidation
  ),
  academicSemesterController.updateSingleSemester
);
router.get('/', academicSemesterController.getAcademicSemester);

export const AcademicSemesterRoutes = router;
