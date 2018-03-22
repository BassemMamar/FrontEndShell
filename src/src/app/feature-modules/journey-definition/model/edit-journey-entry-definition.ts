import { EntryTypes } from './entry-types';
import { MediaAcquisitionChannelType } from './media-acquisition-channel-Type';
import { MediaChannelType } from './media-channel-type';
import { EditDocumentProofPolicy } from './edit-document-proof-policy';

export class EditJourneyEntryDefinition {
    entryType: EntryTypes;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    title: string;
    acceptExpiredDocuments: boolean;
    acceptExpiredUpToMonthes: number;
    askForAdditionalStepsStatus: string;

    supportedChannelTypes: string[];
    documentProofPolicies: EditDocumentProofPolicy[];
    constructor() {
        this.order = 0;
        this.isOptional = false;
        this.maxAttempts = 0;
        this.title = '';
        this.acceptExpiredDocuments = false;
        this.acceptExpiredUpToMonthes = null;
        this.askForAdditionalStepsStatus = '';
        this.supportedChannelTypes = new Array<string>();
        this.documentProofPolicies = new Array<EditDocumentProofPolicy>();
    }
}
