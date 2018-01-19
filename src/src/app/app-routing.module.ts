/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App Routing Components Imports */

import { SelectivePreloadingStrategy } from './core/services/lazy-loading/selective-preloading-strategy';
import { featureModules } from './feature-modules.provider';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'bam',
    loadChildren: 'app/feature-modules/business-account-management/business-account-management.module#BusinessAccountManagementModule',
    data: { preload: false }
  },
  {
    path: 'journeydefinition',
    loadChildren: 'app/feature-modules/journey-definition/journey-definition.module#JourneyDefinitionModule',
    data: { preload: false }
  },
  {
    path: 'investigation',
    loadChildren: 'app/feature-modules/investigation-studio/investigation-studio.module#InvestigationStudioModule',
    data: { preload: false }
  },
  {
    path: 'capture',
    loadChildren: 'app/feature-modules/capture-studio/capture-studio.module#CaptureStudioModule',
    data: { preload: false }
  },

  /* Wildcard Routes ,should be the last route configuration */
  { path: '**', component: PageNotFoundComponent }
];

/* Lazy Loading Modules */
// ...

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy

    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingComponents = [];
