import { DocumentCategoryInfo } from './document-category-info';

export class DocumentProofPolicyDetails {
    documentTypes: DocumentCategoryInfo[];
    countryCodes: string[];

    constructor() {
        this.documentTypes = new Array<DocumentCategoryInfo>();
        this.countryCodes = new Array<string>();
    }
}
