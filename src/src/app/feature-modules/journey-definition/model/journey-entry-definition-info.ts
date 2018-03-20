import { EntryTypes } from './entry-types';
import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { MediaChannelType } from './media-channel-type';

export class JourneyEntryDefinitionInfo {
    entryType: EntryTypes;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    title: string;
    acceptExpiredDocuments: boolean;
    acceptExpiredUpToMonthes: number;
    askForAdditionalSteps: string;

    supportedChannelTypes: MediaChannelType[];
    // documentProofPolicies: tomoorow[];
    constructor() {
        this.order = 0;
        this.isOptional = false;
        this.maxAttempts = 0;
        this.title = '';
        this.acceptExpiredDocuments = false;
        this.acceptExpiredUpToMonthes = null;
        this.askForAdditionalSteps = '';
        this.supportedChannelTypes = [];
    }
}
