import { Routes } from '@angular/router';
/*
* One file to declare all feature modules
* in case tat we want to exclude businessaccountmanagement module for instance, jsut remove it from here
*/

/* Lazy Loading Modules */
export const featureModules: Routes = [

    // BusinessAccountManagement Module
    {
        path: 'bam',
        loadChildren: 'app/business-account-management/business-account-management.module#BusinessAccountManagementModule',
        data: { preload: false }
        // canLoad: [AuthGuard] // canLoad guard takes precedence over the preload strategy.
    },

    // JourneyDefinition Module
    {
        path: 'journeydefinition',
        loadChildren: 'app/journey-definition/journey-definition.module#JourneyDefinitionModule',
        data: { preload: false }
    },

    // InvestigationStudio Module
    {
        path: 'investigation',
        loadChildren: 'app/investigation-studio/investigation-studio.module#InvestigationStudioModule',
        data: { preload: false }
    },

    // CaptureStudio Module
    {
        path: 'capture',
        loadChildren: 'app/capture-studio/capture-studio.module#CaptureStudioModule',
        data: { preload: true }
    }

];
