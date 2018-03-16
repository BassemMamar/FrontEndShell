import { EntryType } from './entry-type';
import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';

export class JourneyEntryDefinitionInfo {
    supportedChannelTypes: MediaAcquisitionChannelType[];
    order: number;
    entryType: EntryType;
    isOptional: Boolean;
    constructor() {
        this.order = 0;
        this.entryType = EntryType.ProofOfIdentity;
        this.isOptional = false;
        this.supportedChannelTypes = [];
    }
}
