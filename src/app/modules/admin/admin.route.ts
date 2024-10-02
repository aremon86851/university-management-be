import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import adminController from './admin.controller';
import { AdminZodValidation } from './admin.validation';
const router = express.Router();

router.get('/', adminController.getAllAdmin);
router.get('/:id', adminController.getSingleAdmin);
router.patch(
  '/:id',
  validationRequest(AdminZodValidation.updateAdminZodValidation),
  adminController.updateSingleAdmin
);

export const AdminRoutes = router;
