import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { ILogger } from './logger/logger.interface.js';
import { LoggerService } from './logger/logger.service.js';
import { TYPES } from './types.js';
import { UserController } from './users/users.controller.js';
import { IUserController } from './users/users.controller.interface.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { IUserService } from './users/users.service.interface.js';
import { UserService } from './users/users.service.js';
import { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { UsersRepository } from './users/users.repository.js';
import { IUsersRepository } from './users/users.repository.interface.js';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
  bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
  bind<IUserService>(TYPES.IUserService).to(UserService);
  bind<IUserController>(TYPES.IUserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
