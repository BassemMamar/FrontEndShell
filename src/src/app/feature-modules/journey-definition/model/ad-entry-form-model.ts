import { EntryTypes } from './entry-types';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';

export class ADEntryFormModel {

    entryType: EntryTypes;
    order: number;
    maxAttempts: number;
    isOptional: Boolean;
    supportedChannelTypes: string[];
    title: string;
    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {
        this.entryType = EntryTypes.AdditionalDocument;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.isOptional = entryDataModel == null ? false : entryDataModel.isOptional;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);

        this.maxAttempts = entryDataModel == null ? 1 : entryDataModel.maxAttempts;
        this.title = entryDataModel == null ? '' : entryDataModel.title;
    }
}
