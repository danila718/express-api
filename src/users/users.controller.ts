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
import { User } from './user.entity.js';
import { IUserService } from './users.service.interface.js';
// import fs from 'fs';
// import { resolve } from 'path';
// import { __dirname } from '../main.js';

// const data = [];

// class User {}
// const users = [];
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) {
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

  public async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }
    this.ok(res, { email: result.email });
  }
}
