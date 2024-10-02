import express from 'express';
import UserRoute from '../modules/users/users.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import Faculty from '../modules/faculty/faculty.route';
import AcademicFaculty from '../modules/academicFaculty/academicFaculty.route';
import AcademicDepartment from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/academic-semesters', AcademicSemesterRoutes);
routes.use('/faculty', Faculty);
routes.use('/academic-faculty', AcademicFaculty);
routes.use('/academic-department', AcademicDepartment);
routes.use('/student', StudentRoutes);
routes.use('/management-department', ManagementDepartmentRoutes);
routes.use('/admins', AdminRoutes);

export default routes;
