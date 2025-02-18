import dotenv from 'dotenv';

const dotenvResult = dotenv.config();

if (dotenvResult.error) {
  throw dotenvResult.error;
}

import * as http from 'http';

import express from 'express';
import cors from 'cors';
import debug from 'debug';

import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import { AuthRoutes } from './auth/auth.routes.config';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

const runningMessage = `Server running at http:localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  debugLog(runningMessage);

  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});