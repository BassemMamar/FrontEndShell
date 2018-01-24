import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject } from '@angular/core';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { LoggerService } from '../logger/logger.service';

export class TimingInterceptor implements HttpInterceptor {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this.loggerService.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      });
  }
}

export const TimingInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true };
