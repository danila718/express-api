import express, { Express, IRoute } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { UserController } from './users/users.controller.js';
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.IExeptionFilter) private errorHandler: IExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }

    bindControllers() {
        this.app.use('/users', this.userController.router);
        // this.logger.log(`${this.userController.constructor.name} binded to App:`);
        // this.logger.log(this.userController.router.stack.map((layer: any) => {
        //     const route = layer?.route;
        //     if (route) {
        //         return `[${JSON.stringify(route?.methods)}] ${route?.path}`;
        //     }
        // }).join('; '), '\n');

        // for (const controller of this.config.controllers) {
        //     this.app.use(controller.path, controller.router);
        //     this.logger.log(`${controller.constructor.name} binded to App:`);
        //     this.logger.log(controller.router.stack.map((layer: any) => {
        //         const route = layer?.route;
        //         if (route) {
        //             return `[${JSON.stringify(route?.methods)}] ${route?.path}`;
        //         }
        //     }).join('; '), '\n');
        // }
    }

    useExeptionFilter() {
        this.app.use(this.errorHandler.catch.bind(this.errorHandler));
    }

    public async init() {
        this.bindControllers();
        this.useExeptionFilter();
        this.server = this.app.listen(this.port);
        // console.log(`Сервер запущен на http://localhost:${this.port}`);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}
