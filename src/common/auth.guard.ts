import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class.js';
import { IMiddleware } from './middleware.interface.js';

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }
    return next(new HTTPError(401, 'Вы не авторизованы', 'auth_guard'));
  }
}
