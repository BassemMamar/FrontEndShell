import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DocumentCategoryInfo } from '../../../model/document-category-info';

@Injectable()
export class CategorySourceLisnerService {
    poiPolicyCategoryLisner = new Subject<boolean>();
    poaPolicyCategoryLisner = new Subject<boolean>();
    constructor() { }
}

export class CategorySourceData {
    documentCategory: DocumentCategoryInfo[];
    operation: string; // add OR delete
    constructor(documentCategory: DocumentCategoryInfo[], operation: string) {
        this.documentCategory = documentCategory;
        this.operation = operation;
    }
}

