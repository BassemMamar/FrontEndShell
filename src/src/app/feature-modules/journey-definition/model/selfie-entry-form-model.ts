import { EntryType } from './entry-type';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionDetails } from './journey-entry-definition-details';

export class SelfieEntryFormModel {
    entryType: EntryType;
    order: number;
    isOptional: boolean;
    supportedChannelTypes: string[];
    constructor(entryDataModel: JourneyEntryDefinitionDetails = null) {
        this.entryType = EntryType.Selfie;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);
    }
}
