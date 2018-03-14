import { EntryType } from './entry-type';

export class JourneyEntryDefinitionInfo {
    order: number;
    entryType: EntryType;
    isOptional: Boolean;
    constructor() {
        this.order = 0;
        this.entryType = EntryType.ProofOfIdentity;
        this.isOptional = false;
    }
}
