import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface.js';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], this.secret, (err, decoded) => {
        if (err) {
          return next();
        }
        if (decoded) {
          if (!(typeof decoded === 'string')) {
            req.user = decoded?.email;
          } else {
            req.user = decoded;
          }
          return next();
        }
      });
    } else {
      next();
    }
  }
}
