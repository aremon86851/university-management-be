import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './modules/users/users.route';
import globalErrorHandler from './middlewares/globarErrorHandler';
const app: Application = express();

app.use(cors());

// console.log(app.get('env'));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application routes
app.use('/api/v1/users', router);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(500, 'Error re error');
  // next('Error abr aise');
  //   throw Error('');
  Promise.reject(new Error('Error is error'));
});

app.use(globalErrorHandler);

export default app;

//11.7
