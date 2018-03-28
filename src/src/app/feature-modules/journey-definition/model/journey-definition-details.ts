import { JourneyEntryDefinitionDetails } from './journey-entry-definition-details';


export class JourneyDefinitionDetails {
    journeyDefinitionGroupId: string;
    lastUpdateDate: Date;
    minAgeLimit?: number;
    maxAgeLimit?: number;
    isActive: boolean;

    name: string;
    code: string;
    introductionMessage: string;
    journeyReasons: string[];
    journeyEntryDefinitions: JourneyEntryDefinitionDetails[];
    constructor() {
        this.journeyDefinitionGroupId = '';
        this.lastUpdateDate = null;
        this.minAgeLimit = 18;
        this.maxAgeLimit = 35;
        this.isActive = false;
        this.name = '';
        this.code = '';
        this.introductionMessage = '';
        this.journeyReasons = new Array<string>();
        this.journeyEntryDefinitions = new Array<JourneyEntryDefinitionDetails>();
    }
}
