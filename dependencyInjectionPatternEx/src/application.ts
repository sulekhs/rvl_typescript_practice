import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DBService } from './service/DBService';
import { container } from './utils/di-container';
import config from 'config';
import logger from "./utils/logger";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

export abstract class Application {
    abstract setup(): Promise<void> | void
  }

export class App extends Application {
    async setup() {
      const _db = container.get(DBService)
  
      await _db.connect()
  
      const server = new InversifyExpressServer(container)
  
      server.setConfig((app) => {
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
      })
  
      const app = server.build()
      const PORT = config.get<number>("port");
      app.listen(PORT, () => {
        logger.info(`Backend started at ${PORT}`);
      })
    }
  }