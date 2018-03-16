import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';
import { EntryTypes } from './entry-types';

export class POIEntryTypeInfo extends JourneyEntryDefinitionInfo {

    constructor() {
        super();
        this.entryType = EntryTypes.ProofOfIdentity;
    }
}
