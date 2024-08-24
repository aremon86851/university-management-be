import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf, prettyPrint } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UM-B!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'info',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'success-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
    }),
  ],
});
const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UM-B!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'error',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export { logger, errorLogger };
