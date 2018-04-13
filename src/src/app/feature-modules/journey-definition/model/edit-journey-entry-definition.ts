import { EntryType } from './entry-type';
import { CaptureMediaChannels } from './capture-media-channels';
import { EditDocumentProofPolicy } from './edit-document-proof-policy';

export class EditJourneyEntryDefinition {
    entryType: EntryType;
    order: number;
    isOptional: boolean;
    maxAttempts: number;
    title: string;
    acceptExpiredDocuments: boolean;
    acceptExpiredUpToMonthes: number;
    askForAdditionalStepsStatus: string;
    canContinueOnFailure: boolean;

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
        this.canContinueOnFailure = false;

        this.supportedChannelTypes = new Array<string>();
        this.documentProofPolicies = new Array<EditDocumentProofPolicy>();
    }
}
