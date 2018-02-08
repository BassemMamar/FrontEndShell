/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Service to Handle Lazy Load Feature Modules */
import { SelectivePreloadingStrategy } from './core/base/lazy-loading/selective-preloading-strategy';

/* Later may isolate declare feature modules in separate file to be customized for release porpuse */
import { featureModules } from './feature-modules.provider';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CaseInsensitiveMatcher } from './core/base/url-case-insensitive/case-insensitive-matcher';

// region routes path Matchers
export function BusinessAccountManagementMatch() {
  return CaseInsensitiveMatcher('BusinessAccountManagement').apply(this, arguments);
}
export function JourneyDefinitionMatch() {
  return CaseInsensitiveMatcher('JourneyDefinition').apply(this, arguments);
}
export function InvestigationStudioMatch() {
  return CaseInsensitiveMatcher('InvestigationStudio').apply(this, arguments);
}
export function CaptureStudioMatch() {
  return CaseInsensitiveMatcher('CaptureStudio').apply(this, arguments);
}
// endregion

const routes: Routes = [
  {
    matcher: BusinessAccountManagementMatch,
    // path: 'bam',
    loadChildren: 'app/feature-modules/business-account-management/business-account-management.module#BusinessAccountManagementModule',
    data: { preload: false, moduleName: 'BusinessAccountManagementModule' }
  },
  {
    matcher: JourneyDefinitionMatch,
    // path: 'journeydefinition',
    loadChildren: 'app/feature-modules/journey-definition/journey-definition.module#JourneyDefinitionModule',
    data: { preload: false }
  },
  {
    matcher: InvestigationStudioMatch,
    // path: 'investigation',
    loadChildren: 'app/feature-modules/investigation-studio/investigation-studio.module#InvestigationStudioModule',
    data: { preload: false }
  },
  {
    matcher: CaptureStudioMatch,
    // path: 'capture',
    loadChildren: 'app/feature-modules/capture-studio/capture-studio.module#CaptureStudioModule',
    data: { preload: false }
  },

  /* Wildcard Routes ,should be the last route configuration */
  { path: '**', component: PageNotFoundComponent }
];

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
