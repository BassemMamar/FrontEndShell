import { EntryTypes } from './entry-types';
import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';

export class JourneyEntryDefinitionInfo {
    supportedChannelTypes: MediaAcquisitionChannelType[];
    order: number;
    entryType: EntryTypes;
    isOptional: Boolean;
    constructor() {
        this.order = 0;
        this.entryType = EntryTypes.ProofOfIdentity;
        this.isOptional = false;
        this.supportedChannelTypes = [];
    }
}
