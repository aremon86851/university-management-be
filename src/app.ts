import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './modules/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

// console.log(app.get('env'));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application routes
app.use('/api/v1/', routes);
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
// throw new ApiError(500, 'Error re error');
// next('Error abr aise');
//   throw Error('');
//   Promise.reject(new Error('Error is error'));
// });

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Page not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl} is not a valid`,
      },
    ],
  });
  next();
});

app.use(globalErrorHandler);
export default app;

//11.7
