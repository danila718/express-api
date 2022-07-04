import { LoggerService } from "../logger/logger.service.js";
import { BaseController } from "./base.controller.js";

export interface IAppConfig {
    logger: LoggerService,
    controllers: BaseController[],
}
