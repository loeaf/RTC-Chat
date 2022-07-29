import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;
  private static LOGGER: winston.Logger;

  constructor(service?) {
    console.info(service);
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint()
      ),
      defaultMeta: { service },
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error-${moment(new Date()).format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: 'error',
          format: combine(nestWinstonModuleUtilities.format.nestLike()),
        }),

        new winston.transports.File({
          filename: `application-${moment(new Date()).format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
      ],
    });
    LoggerService.LOGGER = this.logger;
    console.log = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
  }
  static LOG(message: string) {
    LoggerService.LOGGER.info(message);
  }
  static ERROR(message: string, trace: string) {
    LoggerService.LOGGER.error(message, trace);
  }
  static WARN(message: string) {
    LoggerService.LOGGER.warning(message);
  }
  static DEBUG(message: string) {
    LoggerService.LOGGER.debug(message);
  }
  static VERBOSE(message: string) {
    LoggerService.LOGGER.verbose(message);
  }
  log(message: string) {
    LoggerService.LOGGER.info(message);
  }
  error(message: string, trace: string) {
    LoggerService.LOGGER.error(message, trace);
  }
  warn(message: string) {
    LoggerService.LOGGER.warning(message);
  }
  debug(message: string) {
    LoggerService.LOGGER.debug(message);
  }
  verbose(message: string) {
    LoggerService.LOGGER.verbose(message);
  }
}
