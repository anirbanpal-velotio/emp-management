import 'dotenv/config';
import express, {
  Application, NextFunction, Request, Response,
} from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';

import { dbInit } from './models';
import LoginRouter from './controllers/login';
import UserRouter from './controllers/user';

const app:Application = express();
const db = dbInit();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(CookieParser());
app.use('/auth', LoginRouter);
app.use('/user', UserRouter);
app.use('*', (req:Request, res:Response) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

const PORT = process.env.PORT || 8000;
let server:any;
db?.sequelize.sync({ force: false })
  .then(() => {
    server = app.listen(+PORT, '0.0.0.0', () => {
      console.info(`server started on port ${PORT}`);
    });
  });
process.on('unhandledRejection', (error:Error) => {
  console.info('common catch block for all unhandledRejection exception');
  console.error(error.message);
});
process.on('uncaughtException', (error) => {
  console.info('common catch block for all uncaughtException');
  console.error(error.message);
});
function shutDown() {
  server.close(() => {
    db?.sequelize.close().then(() => {
      console.info('Closed all the DB connections');
      process.exit(0);
    });
    console.info('server is stopped');
  });
}
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
