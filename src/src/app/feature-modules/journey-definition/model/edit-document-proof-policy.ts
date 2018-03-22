import { DocumentCategory } from './document-category';

export class EditDocumentProofPolicy {
    documentTypes: string[];
    countryCodes: string[];
    constructor() {
        this.documentTypes = new Array<string>();
        this.countryCodes = new Array<string>();
    }
}
