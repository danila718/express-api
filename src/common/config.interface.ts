import { IExeptionFilter } from "../errors/exeption.filter.interface.js";
import { LoggerService } from "../logger/logger.service.js";
import { BaseController } from "./base.controller.js";

export interface IAppConfig {
    logger: LoggerService,
    errorHandler: IExeptionFilter,
    controllers: BaseController[],
}
