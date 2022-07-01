import express, { Express, Router } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userRouter: Router;

    constructor(logger: LoggerService, userRouter: Router) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userRouter = userRouter;
    }

    useRoutes() {
        this.app.use('/users', this.userRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        // console.log(`Сервер запущен на http://localhost:${this.port}`);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
