/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App Routing Components Imports */
import { HomeComponent } from './home/home.component';

import { SelectivePreloadingStrategy } from './core/services/lazy-loading/selective-preloading-strategy';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  /* Lazy Loading Modules */
  {
    path: 'investigation',
    loadChildren: 'app/investigation/investigation.module#InvestigationModule',
    data: { preload: true }
    // canLoad: [AuthGuard] // canLoad guard takes precedence over the preload strategy.
  },
  {
    path: 'businessaccountmanagement',
    loadChildren: 'app/business-account-management/business-account-management.module#BusinessAccountManagementModule',
    data: { preload: false }
  },

  /* Wildcard Routes */
  { path: '', pathMatch: 'full', redirectTo: 'home' }
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

export const appRoutingComponents = [HomeComponent];
