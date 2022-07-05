import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface.js';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
  readonly logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false,
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    // отправка в sentry.io
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
