import { Logger as WinstonLogger, createLogger as createWinstonLogger, format, transports } from 'winston';

export default function createLogger(service: string): Logger {
  return new Logger(service);
}

export interface ILogger {
  log(level: string, message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}

class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor(service: string) {
    const { combine, timestamp, prettyPrint, colorize, simple, json } = format;

    this.logger = createWinstonLogger({
      format: combine(timestamp(), prettyPrint()),
      transports: [
        new transports.File({
          filename: 'error.log',
          level: 'error',
          format: json()
        }),
        new transports.Console({
          format: combine(colorize(), simple())
        })
      ],
      defaultMeta: { service }
    });
  }

  public getService(): string {
    return this.logger.defaultMeta.service;
  }

  public log(level: string, message: string, meta?: any) {
    meta ? this.logger.log(level, message, meta) : this.logger.log(level, message);
  }

  public info(message: string, meta?: any) {
    meta ? this.logger.info(message, meta) : this.logger.info(message);
  }

  public warn(message: string, meta?: any) {
    meta ? this.logger.warn(message, ...meta) : this.logger.warn(message);
  }

  public error(message: string, meta?: any) {
    meta ? this.logger.error(message, ...meta) : this.logger.error(message);
  }
}
