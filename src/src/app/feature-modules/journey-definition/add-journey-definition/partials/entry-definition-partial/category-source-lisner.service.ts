import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DocumentCategory } from '../../../model/document-category';

@Injectable()
export class CategorySourceLisnerService {
    lisner = new Subject<CategorySourceData>();
    constructor() { }
}

export class CategorySourceData {
    documentCategory: DocumentCategory[];
    operation: string; // add OR delete
    constructor(documentCategory: DocumentCategory[], operation: string) {
        this.documentCategory = documentCategory;
        this.operation = operation;
    }
}

