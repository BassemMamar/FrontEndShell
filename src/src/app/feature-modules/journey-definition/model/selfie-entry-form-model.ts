import { EntryType } from './entry-type';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-details';

export class SelfieEntryFormModel {
    entryType: EntryType;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    supportedChannelTypes: string[];
    canContinueOnFailure: boolean;
    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {
        this.entryType = EntryType.Selfie;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.maxAttempts = entryDataModel == null ? 1 : entryDataModel.maxAttempts;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);
        this.canContinueOnFailure = entryDataModel == null ? false : entryDataModel.canContinueOnFailure;
    }
}
