import { EntryType } from './entry-type';
import { CaptureMediaChannels } from './capture-media-channels';
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

    supportedChannelTypes: CaptureMediaChannels[];
    documentProofPolicies: DocumentProofPolicyDetails[];
    constructor() {
        this.order = 0;
        this.isOptional = false;
        this.maxAttempts = 0;
        this.title = '';
        this.acceptExpiredDocuments = false;
        this.acceptExpiredUpToMonthes = null;
        this.askForAdditionalSteps = '';
        this.supportedChannelTypes = new Array<CaptureMediaChannels>();
        this.documentProofPolicies = new Array<DocumentProofPolicyDetails>();
    }
}
