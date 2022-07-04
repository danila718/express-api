import { IExeptionFilter } from "../errors/exeption.filter.interface.js";
import { ILogger } from "../logger/logger.interface.js";
import { BaseController } from "./base.controller.js";

export interface IAppConfig {
    logger: ILogger,
    errorHandler: IExeptionFilter,
    controllers: BaseController[],
}
