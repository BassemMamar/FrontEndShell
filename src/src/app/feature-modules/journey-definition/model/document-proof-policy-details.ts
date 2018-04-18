import { DocumentCategoryInfo } from './document-category-info';
import { CountryInfo } from './world-region-info';

export class DocumentProofPolicyDetails {
    documentCategories: DocumentCategoryInfo[];
    countries: CountryInfo[];

    constructor() {
        this.documentCategories = new Array<DocumentCategoryInfo>();
        this.countries = new Array<CountryInfo>();
    }
}
