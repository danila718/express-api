import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller.js';
import { HTTPError } from '../errors/http-error.class.js';
import { ILogger } from '../logger/logger.interface.js';
import { TYPES } from '../types.js';
import { IUserController } from './users.controller.interface.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { IUserService } from './users.service.interface.js';
import { ValidateMiddleware } from '../common/validate.middleware.js';
import jsonwebtoken from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface.js';
import { AuthGuard } from '../common/auth.guard.js';
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
    @inject(TYPES.IConfigService) private configService: IConfigService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        method: 'post',
        path: '/register',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        method: 'get',
        path: '/info',
        func: this.info,
        middlewares: [new AuthGuard()],
      },
    ]);
  }

  public async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userValidated = await this.userService.validateUser(body);
    if (!userValidated) {
      return next(new HTTPError(401, 'Ошибка авторизации', 'login'));
    }

    const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));

    this.ok(res, { success: true, token: jwt });
  }

  public async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    let result = null;
    try {
      result = await this.userService.createUser(body);
    } catch (err) {
      if (err instanceof Error) {
        return next(new HTTPError(500, 'Internal server error'));
      }
    }
    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }
    this.ok(res, { id: result.id, email: result.email });
  }

  public async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    const userModel = await this.userService.getUserInfo(user);
    if (!userModel) {
      return next(new HTTPError(500, 'Internal server error'));
    }
    this.ok(res, { id: userModel.id, email: userModel.email, name: userModel.name });
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, jwt) => {
          if (err) {
            reject(err);
          }
          resolve(jwt as string);
        },
      );
    });
  }
}
