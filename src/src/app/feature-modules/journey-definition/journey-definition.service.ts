import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '../../core/base/logger/logger.service';
import { HttpErrorHandlingService } from '../../core/services/http-error-handling/http-error-handling.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntryDefinitionOptions } from './model/entry-definition-options';
import { MediaChannelType } from './model/media-channel-type';

@Injectable()
export class JourneyDefinitionService {

  constructor(private http: HttpClient, private logger: LoggerService, private httpErrorHandlingService: HttpErrorHandlingService) { }

  getEntryDefinitionOptions(): Observable<EntryDefinitionOptions[]> {
    return this.http.get<EntryDefinitionOptions[]>('api/entryDefinitionOptions')
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getMediaChannelTypes(): Observable<MediaChannelType[]> {
    return this.http.get<MediaChannelType[]>('api/mediaChannelTypes')
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

}
