/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleSimplifiedError from '../../errors/handleValidationError';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import ApiError from '../../errors/ApiError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log(`Error`, error)
    : console.log(error);
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
