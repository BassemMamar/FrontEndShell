import { JourneyEntryDefinitionInfo } from './journey-entry-definition-info';

export class JourneyDefinitionInfo {
    name: string;
    code: string;
    introductionMessage: string;
    journeyReasons: string[];
    journeyEntryDefinitions: JourneyEntryDefinitionInfo[];
    constructor() {
        this.name = '';
        this.code = '';
        this.introductionMessage = '';
        this.journeyReasons = new Array<string>();
        this.journeyEntryDefinitions = new Array<JourneyEntryDefinitionInfo>();
    }
}
