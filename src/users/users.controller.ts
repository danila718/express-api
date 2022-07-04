import { Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { LoggerService } from "../logger/logger.service.js";

export class UserController extends BaseController {

    constructor(path: string, logger: LoggerService) {
        super(path, logger);

        this.bindRoutes([
            { method: 'post', path: '/login', func: this.login },
            { method: 'post', path: '/register', func: this.register },
        ]);
    }

    public login(req: Request, res: Response) {
        this.ok(res, {
            success: true,
            message: 'Login',
        });
    }

    public register(req: Request, res: Response) {
        this.ok(res, {
            success: true,
            message: 'Register',
        });
    }
}