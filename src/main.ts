import { App } from './app.js';
import { IAppConfig } from './common/config.interface.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';

async function bootstrap() {
    const app = new App(getConfig());
    await app.init();
}

function getConfig(): IAppConfig {
    const logger = new LoggerService();

    return {
        logger: logger,
        userController: new UserController(logger),
    };
}

bootstrap();
