import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller.js';
import { HTTPError } from '../errors/http-error.class.js';
import { ILogger } from '../logger/logger.interface.js';
import { TYPES } from '../types.js';
import 'reflect-metadata';
import { IUserController } from './users.interface.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
// import fs from 'fs';
// import { resolve } from 'path';
// import { __dirname } from '../main.js';

// const data = [];

// class User {}
// const users = [];
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
    super(loggerService);

    this.bindRoutes([
      { method: 'post', path: '/login', func: this.login },
      { method: 'post', path: '/register', func: this.register },
    ]);
  }

  public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);

    next(new HTTPError(401, 'Ошибка авторизации', 'login'));
    // users.push(new User());
    // this.ok(res, {
    //     success: true,
    //     message: 'Login',
    // });
  }

  public register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
    // data.push(fs.readFileSync(resolve(__dirname, '../1.mp4')));
    console.log(req.body);
    this.ok(res, {
      success: true,
      message: 'Register',
    });
  }
}
