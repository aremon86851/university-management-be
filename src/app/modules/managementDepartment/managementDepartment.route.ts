import express from 'express';
import managementDepartmentController from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import validateRequest from '../../middlewares/validationRequest';
const router = express.Router();

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  managementDepartmentController.createManagementDepartment
);

router.get('/', managementDepartmentController.getAllManagementDepartments);

router.get(
  '/:id',
  managementDepartmentController.getSinglelManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  managementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = router;
