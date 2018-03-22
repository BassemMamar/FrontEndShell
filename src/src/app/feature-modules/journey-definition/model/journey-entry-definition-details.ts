import { EntryTypes } from './entry-types';
import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { MediaChannelType } from './media-channel-type';
import { DocumentProofPolicyDetails } from './document-proof-policy-details';

export class JourneyEntryDefinitionDetails {
    entryType: EntryTypes;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    title: string;
    acceptExpiredDocuments: boolean;
    acceptExpiredUpToMonthes: number;
    askForAdditionalSteps: string;

    supportedChannelTypes: MediaChannelType[];
    documentProofPolicies: DocumentProofPolicyDetails[];
    constructor() {
        this.order = 0;
        this.isOptional = false;
        this.maxAttempts = 0;
        this.title = '';
        this.acceptExpiredDocuments = false;
        this.acceptExpiredUpToMonthes = null;
        this.askForAdditionalSteps = '';
        this.supportedChannelTypes = new Array<MediaChannelType>();
        this.documentProofPolicies = new Array<DocumentProofPolicyDetails>();
    }
}
