import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';

import { LoggerService } from '../../core/base/logger/logger.service';
import { HttpErrorHandlingService } from '../../core/services/http-error-handling/http-error-handling.service';
import { EntryDefinitionOptions } from './model/entry-definition-options';
import { WorldRegionInfo } from './model/world-region-info';
import { DocumentCategory } from './model/document-category';
import { EditJourneyDefinition } from './model/edit-journey-definition';
import { JourneyDefinitionDetails } from './model/journey-definition-details';
import { SupportedCaptureMediaChannels } from './model/supported-capture-media-channels';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { DocumentCategoryType } from './model/document-category-type';
import { EntryTypes } from './model/entry-types';

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
        { name: 'Proof Of Identity', value: EntryTypes.ProofOfIdentity },
        { name: 'Proof Of Address', value: EntryTypes.ProofOfAddress },
        { name: 'Additional Document', value: EntryTypes.AdditionalDocument },
        { name: 'Selfie', value: EntryTypes.Selfie }
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

  getSupportedCaptureMediaChannels(): Observable<SupportedCaptureMediaChannels[]> {
    return this.http.get<SupportedCaptureMediaChannels[]>(this.apiUrl + 'api/JourneyDefinition/SupportedCaptureMediaChannels')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getWorldRegionInfo(): Observable<WorldRegionInfo[]> {
    return this.http.get<WorldRegionInfo[]>(this.apiUrl + 'api/JourneyDefinition/Regions')
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getDocumentCategories(type: DocumentCategoryType): Observable<DocumentCategory[]> {
    return this.http.get<DocumentCategory[]>(this.apiUrl + `api/DocumentCategory/${type}`)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  getJourneyDefinition(id: string): Observable<JourneyDefinitionDetails> {
    return this.http.get<JourneyDefinitionDetails>(this.apiUrl + `api/JourneyDefinition/${id}`)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  addJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionDetails[]> {
    return this.http.post<EditJourneyDefinition[]>(this.apiUrl + 'api/JourneyDefinition/Add', editJourneyDefinition)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }

  updateJourneyDefinition(editJourneyDefinition: EditJourneyDefinition): Observable<JourneyDefinitionDetails[]> {
    return this.http.put<EditJourneyDefinition[]>(this.apiUrl + 'api/JourneyDefinition/Update', editJourneyDefinition)
      .map((respons: any) => respons.result)
      .pipe(
      catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
      );
  }


}
