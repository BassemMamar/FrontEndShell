import { InvestigationStudioPages } from './investigation.pages';
import { BusinessAccountManagementPages } from './business-account-management.pages';
import { CaptureStudioPages } from './capture-studio.pages';
import { JourneyDefinitionPages } from './journey-definition.pages';


export class FrontendShell {
    static BusinessAccountManagement = {
        Name: 'BusinessAccountManagement',
        Pages: BusinessAccountManagementPages
    };

    static JourneyDefinition = {
        Name: 'JourneyDefinition',
        Pages: JourneyDefinitionPages
    };

    static InvestigationStudio = {
        Name: 'InvestigationStudio',
        Pages: InvestigationStudioPages
    };

    static CaptureStudio = {
        Name: 'CaptureStudio',
        Pages: CaptureStudioPages
    };

}

