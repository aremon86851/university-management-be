import express from 'express';
import UserRoute from '../users/users.route';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/academic-semesters', AcademicSemesterRoutes);

export default routes;
