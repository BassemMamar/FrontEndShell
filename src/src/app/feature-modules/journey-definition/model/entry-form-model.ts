import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { JourneyEntryDefinitionDetails } from './journey-entry-definition-details';
import { EntryType } from './entry-type';

export class EntryFormModel {
    order: number;
    entryType: EntryType;
    isOptional: Boolean;
    supportedChannelTypes: string[];
    constructor() {
        this.order = 0;
        this.entryType = EntryType.ProofOfIdentity;
        this.isOptional = false;
        this.supportedChannelTypes = new Array<string>();
    }
}
