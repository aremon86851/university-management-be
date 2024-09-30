import express from 'express';
import UserRoute from '../modules/users/users.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import Faculty from '../modules/faculty/faculty.route';
import AcademicFaculty from '../modules/academicFaculty/academicFaculty.route';
import AcademicDepartment from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/academic-semesters', AcademicSemesterRoutes);
routes.use('/faculty', Faculty);
routes.use('/academic-faculty', AcademicFaculty);
routes.use('/academic-department', AcademicDepartment);
routes.use('/student', StudentRoutes);

export default routes;
