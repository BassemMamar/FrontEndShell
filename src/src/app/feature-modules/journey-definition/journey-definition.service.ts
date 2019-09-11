import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { LoggerService } from '../../core/base/logger/logger.service';
import { HttpErrorHandlingService } from '../../core/services/http-error-handling/http-error-handling.service';
import { EntryDefinitionOptions } from './model/entry-definition-options';
import { WorldRegionInfo } from './model/world-region-info';
import { DocumentCategoryInfo } from './model/document-category-info';
import { EditJourneyDefinition } from './model/edit-journey-definition';
import { JourneyDefinitionInfo } from './model/journey-definition-details';
import { CaptureMediaChannels } from './model/capture-media-channels';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { EntryType } from './model/entry-type';
import { JourneyDefinitionSummary } from './model/journey-definition-summary';

@Injectable()
export class JourneyDefinitionService {
  apiUrl: string;
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private communicationService: CommunicationService,
    private httpErrorHandlingService: HttpErrorHandlingService) {
    this.apiUrl = communicationService.api.url + communicationService.api.bases.onBoarding;
  }

  getEntryDefinitionOptions(): Observable<EntryDefinitionOptions[]> {
    const entryDefinitionOptions = {
      result: [
        { name: 'Proof Of Identity', value: EntryType.ProofOfIdentity },
        { name: 'Proof Of Address', value: EntryType.ProofOfAddress },
        { name: 'Additional Document', value: EntryType.AdditionalDocument },
        { name: 'Selfie', value: EntryType.Selfie }
      ],
      responseMetaData: null
    };
    return of(entryDefinitionOptions.result);
    // return this.http.get<EntryDefinitionOptions[]>(this.apiUrl + 'api/JourneyDefinition/entryDefinitionOptions')
    //   .map((respons: any) => respons.result)
    //   .pipe(
    //   catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
    //   );
  }

  getCaptureMediaChannels(): Observable<CaptureMediaChannels[]> {
    return this.http.get<CaptureMediaChannels[]>(this.apiUrl + 'api/JourneyDefinitions/CaptureMediaChannels')
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getWorldRegionInfo(): Observable<WorldRegionInfo[]> {
    return this.http.get<WorldRegionInfo[]>(this.apiUrl + 'api/JourneyDefinitions/Regions')
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getDocumentCategories(type: EntryType): Observable<DocumentCategoryInfo[]> {
    return this.http.get<DocumentCategoryInfo[]>(this.apiUrl + `api/JourneyDefinitions/${type}`) // DocumentCategories/
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getJourneyDefinition(id: string): Observable<JourneyDefinitionInfo> {
    return this.http.get<JourneyDefinitionInfo>(this.apiUrl + `api/JourneyDefinitions/${id}`)
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  addJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionInfo[]> {
    return of([]);
    // return this.http.post<EditJourneyDefinition[]>(this.apiUrl + 'api/JourneyDefinitions', editJourneyDefinition)
    //   .map((respons: any) => respons.result)
    //   .pipe(
    //     catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
    //   );
  }

  updateJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionInfo[]> {
    return this.http.put<EditJourneyDefinition[]>(this.apiUrl + 'api/JourneyDefinitions', editJourneyDefinition)
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getJourneyDefinitions(): Observable<JourneyDefinitionSummary[]> {
    return this.http.get<JourneyDefinitionSummary[]>(this.apiUrl + `api/JourneyDefinitions/List`)
      .map((respons: any) => respons.result)
      .pipe(
        catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

}
