import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { UserZodValidation } from './users.validation';
import { usersController } from './users.controller';
const UserRoute = express.Router();

UserRoute.get('/:id', usersController.getASingleUser);

UserRoute.post(
  '/create-student',
  validationRequest(UserZodValidation.createStudentZodValidation),
  usersController.createStudent
);
UserRoute.post(
  '/create-faculty',
  validationRequest(UserZodValidation.createFacultyZodValidation),
  usersController.createFaculty
);
UserRoute.post(
  '/create-admin',
  validationRequest(UserZodValidation.createAdminZodValidation),
  usersController.createAdmin
);

UserRoute.get('/', usersController.getAllUsers);

export default UserRoute;
