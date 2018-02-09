import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ErrorHandlingService } from '../core/services/error-handling-service/error-handling.service';
import { LoggerService } from '../core/base/logger/logger.service';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private logger: LoggerService, private errorHandlingService: ErrorHandlingService) { }

    getHeros() {
        return this.http.get('api/heroes')
            .pipe(
            catchError(error => this.errorHandlingService.handle(error))
            );
    }

}
