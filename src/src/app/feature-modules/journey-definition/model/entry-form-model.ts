import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';
import { EntryTypes } from './entry-types';

export class EntryFormModel {
    order: number;
    entryType: EntryTypes;
    isOptional: Boolean;
    supportedChannelTypes: string[];
    constructor() {
        this.order = 0;
        this.entryType = EntryTypes.ProofOfIdentity;
        this.isOptional = false;
        this.supportedChannelTypes = new Array<string>();
    }
}
