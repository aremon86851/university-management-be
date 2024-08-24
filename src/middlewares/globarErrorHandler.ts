/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../interfaces/error';
import config from '../config';
import handleSimplifiedError from '../errors/handleValidationError';
import ApiError from '../errors/ApiError';
import { errorLogger } from '../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   if (err instanceof Error) {
  //     res.status(400).json({ error: err.message });
  //   } else {
  //     res.status(500).json({ error: 'Some this is wrong' });
  //   }
  config.env === 'development'
    ? console.log(`Error`, error)
    : errorLogger.error(error);
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'validationError') {
    const simplifiedError = handleSimplifiedError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
