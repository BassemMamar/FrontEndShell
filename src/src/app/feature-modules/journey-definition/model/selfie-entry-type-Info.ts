import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';
import { EntryType } from './entry-type';

export class SelfieEntryTypeInfo extends JourneyEntryDefinitionInfo  {
  
    constructor(){
        super();
        this.entryType = EntryType.Selfie
    }
}
