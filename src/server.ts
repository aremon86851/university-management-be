import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', () => {
  console.log('Uncaught exception is detected.....');
  process.exit(1);
});
async function main() {
  let server: Server;
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`😊Database connected successfully😊}`);
    app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
  process.on('unhandledRejection', (error) => {
    // console.log('unhandled error server want to off');
    // new Error(error);
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
