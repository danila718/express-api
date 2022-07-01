import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';

async function bootstrap() {
    const loggerService = new LoggerService();
    const app = new App(loggerService, (new UserController(loggerService)).router);
    await app.init();
}

bootstrap();
