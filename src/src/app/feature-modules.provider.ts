import { Routes } from '@angular/router';
/*
* One file to declare all feature modules
* in case tat we want to exclude businessaccountmanagement module for instance, jsut remove it from here
*/

// {
//     path: 'bam',
//     loadChildren: 'app/business-account-management/business-account-management.module#BusinessAccountManagementModule',
//     data: { preload: false }
//      // canLoad: [AuthGuard] // canLoad guard takes precedence over the preload strategy.
// },

/* Lazy Loading Modules */
export const featureModules: Routes = [
];
