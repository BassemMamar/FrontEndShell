import { EntryType } from './entry-type';
import { EntryFormModel } from './entry-form-model';
import { JourneyEntryDefinitionInfo } from './journey-entry-definition-details';
import { AskForAdditionalSteps } from './ask-for-additional-steps';

export class POIEntryFormModel {
    entryType: EntryType;
    order: number;
    isOptional: Boolean;
    supportedChannelTypes: string[];

    maxAttempts: number;
    askForAdditionalSteps: string;
    acceptExpiredDocuments: boolean;
    isUpToMonthes: boolean;
    acceptExpiredUpToMonthes: number;
    canContinueOnFailure: boolean;
    documentProofPolicies: string[];

    constructor(entryDataModel: JourneyEntryDefinitionInfo = null) {


        this.entryType = EntryType.ProofOfIdentity;
        this.order = entryDataModel == null ? 0 : entryDataModel.order;
        this.isOptional = entryDataModel == null ? false : entryDataModel.isOptional;
        this.supportedChannelTypes = entryDataModel == null ? [] : entryDataModel.supportedChannelTypes.map(t => t.channelType);

        this.maxAttempts = entryDataModel == null ? 1 : entryDataModel.maxAttempts;
        this.askForAdditionalSteps = entryDataModel == null ? AskForAdditionalSteps.Never : entryDataModel.askForAdditionalSteps;
        this.acceptExpiredDocuments = entryDataModel == null ? false : entryDataModel.acceptExpiredDocuments;
        this.isUpToMonthes = entryDataModel == null || entryDataModel.acceptExpiredUpToMonthes == null
            ? false : true;
        this.acceptExpiredUpToMonthes = entryDataModel == null ? null : entryDataModel.acceptExpiredUpToMonthes;
        this.canContinueOnFailure = entryDataModel == null ? false : entryDataModel.canContinueOnFailure;
    }
}
