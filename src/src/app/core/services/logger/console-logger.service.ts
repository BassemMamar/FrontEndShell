import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Logger } from './logger.service';

export let isDebugMode = environment.isDebugMode;

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {

    get log() {
        if (isDebugMode) {
            return console.log.bind(console);
        } else {
            return noop;
        }
    }

    get info() {
        if (isDebugMode) {
            return console.info.bind(console);
        } else {
            return noop;
        }
    }

    get warn() {
        if (isDebugMode) {
            return console.warn.bind(console);
        } else {
            return noop;
        }
    }

    get error() {
        if (isDebugMode) {
            return console.error.bind(console);
        } else {
            return noop;
        }
    }

    get trace() {
        if (isDebugMode) {
            return console.trace.bind(console);
        } else {
            return noop;
        }
    }

    get debug() {
        if (isDebugMode) {
            return console.debug.bind(console);
        } else {
            return noop;
        }
    }

    get table() {
        if (isDebugMode) {
            return console.table.bind(console);
        } else {
            return noop;
        }
    }
}

