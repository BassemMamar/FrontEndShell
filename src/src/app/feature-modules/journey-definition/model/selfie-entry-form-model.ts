import { EntryTypes } from './entry-types';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionDetails } from './journey-entry-definition-details';

export class SelfieEntryFormModel {


    entryType: EntryTypes;
    order: number;
    supportedChannelTypes: string[];
    constructor(entryDataModel: JourneyEntryDefinitionDetails = null) {
        this.entryType = EntryTypes.Selfie;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);
    }
}
