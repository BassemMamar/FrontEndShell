import { EntryTypes } from './entry-types';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';

export class SelfieEntryFormModel {


    entryType: EntryTypes;
    order: number;
    supportedChannelTypes: string[];
    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {
        this.entryType = EntryTypes.Selfie;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);
    }
}
