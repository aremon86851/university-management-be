import { ZodError } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const validationError: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: `${issue.path[issue.path.length - 1]} is ${issue.message}`,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessage: validationError,
  };
};

export default handleZodError;
