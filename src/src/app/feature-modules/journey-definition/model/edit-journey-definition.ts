import { JourneyEntryDefinitionInfo } from './journey-entry-definition-details';
import { EditJourneyEntryDefinition } from './edit-journey-entry-definition';

export class EditJourneyDefinition {
    id: string;
    name: string;
    code: string;
    introductionMessage: string;
    minAgeLimit?: number;
    maxAgeLimit?: number;
    isActive: boolean;
    canHaveExtraDocuments:boolean;
    journeyReasons: string[];
    journeyEntryDefinitions: EditJourneyEntryDefinition[];
    constructor() {
        this.id = '';
        this.name = '';
        this.code = '';
        this.introductionMessage = '';
        this.minAgeLimit = null;
        this.maxAgeLimit = null;
        this.isActive = false;
        this.canHaveExtraDocuments=false;
        this.journeyReasons = new Array<string>();
        this.journeyEntryDefinitions = new Array<EditJourneyEntryDefinition>();
    }
}
