import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserZodValidation } from './users.validation';
import { usersController } from './users.controller';
const UserRoute = express.Router();

UserRoute.post(
  '/create-user',
  validationRequest(UserZodValidation.createUserZodValidation),
  usersController.createUser
);

export default UserRoute;
