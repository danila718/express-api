import express, { Express } from 'express';
import { Server } from 'http';
import { IAppConfig } from './common/config.interface.js';

export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(private config: IAppConfig) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.config.userController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        // console.log(`Сервер запущен на http://localhost:${this.port}`);
        this.config.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
