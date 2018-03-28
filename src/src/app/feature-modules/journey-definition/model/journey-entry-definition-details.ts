import { EntryType } from './entry-type';
import { SupportedCaptureMediaChannelInfo } from './supported-capture-media-channel-info';
import { DocumentProofPolicyDetails } from './document-proof-policy-details';

export class JourneyEntryDefinitionDetails {
    entryType: EntryType;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    title: string;
    acceptExpiredDocuments: boolean;
    acceptExpiredUpToMonthes: number;
    askForAdditionalSteps: string;

    supportedChannelTypes: SupportedCaptureMediaChannelInfo[];
    documentProofPolicies: DocumentProofPolicyDetails[];
    constructor() {
        this.order = 0;
        this.isOptional = false;
        this.maxAttempts = 0;
        this.title = '';
        this.acceptExpiredDocuments = false;
        this.acceptExpiredUpToMonthes = null;
        this.askForAdditionalSteps = '';
        this.supportedChannelTypes = new Array<SupportedCaptureMediaChannelInfo>();
        this.documentProofPolicies = new Array<DocumentProofPolicyDetails>();
    }
}
