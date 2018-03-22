import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '../../core/base/logger/logger.service';
import { HttpErrorHandlingService } from '../../core/services/http-error-handling/http-error-handling.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntryDefinitionOptions } from './model/entry-definition-options';
import { MediaChannelType } from './model/media-channel-type';
import { WorldRegionInfo } from './model/world-region-info';
import { map } from 'rxjs/operator/map';
import { DocumentCategory } from './model/document-category';
import { EditJourneyDefinition } from './model/edit-journey-definition';
import { JourneyDefinitionDetails } from './model/journey-definition-details';

@Injectable()
export class JourneyDefinitionService {

  constructor(private http: HttpClient, private logger: LoggerService, private httpErrorHandlingService: HttpErrorHandlingService) { }

  getEntryDefinitionOptions(): Observable<EntryDefinitionOptions[]> {
    return this.http.get<EntryDefinitionOptions[]>('api/JourneyDefinition/entryDefinitionOptions')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getMediaChannelTypes(): Observable<MediaChannelType[]> { // **
    return this.http.get<MediaChannelType[]>('api/JourneyDefinition/SupportedCaptureMediaChannels')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getWorldRegionInfo(): Observable<WorldRegionInfo[]> {
    return this.http.get<WorldRegionInfo[]>('api/JourneyDefinition/Regions')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getTypes(): Observable<DocumentCategory[]> {
    return this.http.get<DocumentCategory[]>('api/JourneyDefinition/POACategory')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getJourneyDefinition(id: string): Observable<JourneyDefinitionDetails> {
    return this.http.get<JourneyDefinitionDetails>(`api/JourneyDefinition/${id}`)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  addJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionDetails[]> {
    return this.http.post<EditJourneyDefinition[]>('api/JourneyDefinition/Add', editJourneyDefinition)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  updateJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionDetails[]> {
    return this.http.put<EditJourneyDefinition[]>('api/JourneyDefinition/Update', editJourneyDefinition)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }


}
