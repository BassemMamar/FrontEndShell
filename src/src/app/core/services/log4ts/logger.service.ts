import { Injectable } from '@angular/core';

import { ConsoleLoggerService } from './console-logger.service';


const noop = (): any => undefined;

export abstract class Logger {
  log: any;
  info: any;
  warn: any;
  error: any;
}

@Injectable()
export class LoggerService implements Logger {
  log: any;
  info: any;
  warn: any;
  error: any;

}

export const log4tsProvider = { provide: LoggerService, useClass: ConsoleLoggerService };

/*
@Injectable()
export class NoOpLogger implements Logger {
  get info() {
    return noop;
  }
  get warn() {
    return noop;
  }
  get error() {
    return noop;
  }
}
*/

// The set of built-in Log4j levels includes TRACE, DEBUG, INFO, WARN, ERROR, and FATAL.