import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface.js';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  async execute({ body }: Request, res: Response, next: NextFunction): Promise<void> {
    const instance = plainToClass(this.classToValidate, body);

    const errors = await validate(instance);

    if (errors.length > 0) {
      res.status(422).send(errors);
      return;
    }

    next();
  }
}
