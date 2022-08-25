import express, { Express, IRoute } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface.js';
import bodyParser from 'body-parser';
import { IConfigService } from './config/config.service.interface.js';
import { PrismaService } from './database/prisma.service.js';
import { AuthMiddleware } from './common/auth.middleware.js';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserController) private userController: IUserController,
    @inject(TYPES.IExeptionFilter) private errorHandler: IExeptionFilter,
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = 8000;
  }

  bindMiddlewares(): void {
    this.app.use(bodyParser.json());
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  bindControllers(): void {
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

  useExeptionFilter(): void {
    this.app.use(this.errorHandler.catch.bind(this.errorHandler));
  }

  public async init(): Promise<void> {
    this.bindMiddlewares();
    this.bindControllers();
    this.useExeptionFilter();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    // console.log(`Сервер запущен на http://localhost:${this.port}`);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
