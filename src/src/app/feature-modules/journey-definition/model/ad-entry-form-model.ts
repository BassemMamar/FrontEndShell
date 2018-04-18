import { EntryType } from './entry-type';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-details';

export class ADEntryFormModel {

    entryType: EntryType;
    order: number;
    maxAttempts: number;
    isOptional: Boolean;
    supportedChannelTypes: string[];
    title: string;
    canContinueOnFailure: boolean;
    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {
        this.entryType = EntryType.AdditionalDocument;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.isOptional = entryDataModel == null ? false : entryDataModel.isOptional;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);

        this.maxAttempts = entryDataModel == null ? 1 : entryDataModel.maxAttempts;
        this.title = entryDataModel == null ? '' : entryDataModel.title;
        this.canContinueOnFailure = entryDataModel == null ? false : entryDataModel.canContinueOnFailure;
    }
}
