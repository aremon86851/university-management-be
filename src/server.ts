import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', () => {
  errorLogger.error('Uncaught exception is detected.....');
  process.exit(1);
});
async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`😊Database connected successfully😊}`);
    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
  process.on('unhandledRejection', (error) => {
    errorLogger.error('unhadnle error server want to off');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
