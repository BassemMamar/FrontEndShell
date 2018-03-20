import { EntryTypes } from './entry-types';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';

export class POIEntryFormModel {
    entryType: EntryTypes;
    order: number;
    isOptional: Boolean;
    supportedChannelTypes: string[];

    maxAttempts: number;
    askForAdditionalSteps: string;
    acceptExpiredDocuments: boolean;
    isUpToMonthes: boolean;
    acceptExpiredUpToMonthes: number;
    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {


        this.entryType = EntryTypes.ProofOfIdentity;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.isOptional = entryDataModel == null ? false : entryDataModel.isOptional;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);

        this.maxAttempts = entryDataModel == null ? 1 : entryDataModel.maxAttempts;
        this.askForAdditionalSteps = entryDataModel == null ? '' : entryDataModel.askForAdditionalSteps;
        this.acceptExpiredDocuments = entryDataModel == null ? false : entryDataModel.acceptExpiredDocuments;
        this.isUpToMonthes = entryDataModel == null || entryDataModel.acceptExpiredUpToMonthes == null
            ? false : true;
        this.acceptExpiredUpToMonthes = entryDataModel == null ? null : entryDataModel.acceptExpiredUpToMonthes;
    }
}
