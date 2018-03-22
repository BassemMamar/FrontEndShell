import { DocumentCategory } from './document-category';

export class DocumentProofPolicyDetails {
    documentTypes: DocumentCategory[];
    countryCodes: string[];
    constructor() {
        this.documentTypes = new Array<DocumentCategory>();
        this.countryCodes = new Array<string>();
    }
}
