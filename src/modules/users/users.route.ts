import express from 'express';
import usersController from './users.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserZodValidation } from './users.validation';
const router = express.Router();

router.post(
  '/create-user',
  validationRequest(UserZodValidation.createUserZodValidation),
  usersController.createUser
);

export default router;
