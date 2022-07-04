import { Container } from 'inversify';
import { App } from './app.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { ILogger } from './logger/logger.interface.js';
import { LoggerService } from './logger/logger.service.js';
import { TYPES } from './types.js';
import { UserController } from './users/users.controller.js';

// async function bootstrap() {
//     const app = new App(getConfig());


// }

// function getConfig(): IAppConfig {
//     const logger = new LoggerService();

//     return {
//         logger: logger,
//         controllers: [
//             new UserController('/users', logger),
//         ],
//         errorHandler: new ExeptionFilter(logger),
//     };
// }

// bootstrap();

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();

export { app, appContainer };
