import express, { Express, IRoute } from 'express';
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

    bindControllers() {
        for (const controller of this.config.controllers) {
            this.app.use(controller.path, controller.router);
            this.config.logger.log(`${controller.constructor.name} binded to App:`);
            this.config.logger.log(controller.router.stack.map((layer: any) => {
                const route = layer?.route;
                if (route) {
                    return `[${JSON.stringify(route?.methods)}] ${route?.path}`;
                }
            }).join('; '), '\n');
        }
    }

    public async init() {
        this.bindControllers();
        this.server = this.app.listen(this.port);
        // console.log(`Сервер запущен на http://localhost:${this.port}`);
        this.config.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
