import express from 'express';
import UserRoute from '../modules/users/users.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/academic-semesters', AcademicSemesterRoutes);

export default routes;
