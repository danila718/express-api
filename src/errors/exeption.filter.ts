import { NextFunction, Request, Response } from "express";
import { ILogger } from "../logger/logger.interface.js";
import { IExeptionFilter } from "./exeption.filter.interface.js";
import { HTTPError } from "./http-error.class.js";

export class ExeptionFilter implements IExeptionFilter {
    constructor(private logger: ILogger) {}

    catch (err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Ошибка: ${err.statusCode} ${err.message}`);
            res.status(err.statusCode).send({ err: err.message, code: err.statusCode });
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({ err: err.message });
        }
    }
}
