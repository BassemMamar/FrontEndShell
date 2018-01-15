/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* App Routing Components Imports */
import { HomeComponent } from './home/home.component';

import { SelectivePreloadingStrategy } from './core/services/lazy-loading/selective-preloading-strategy';
import { featureModules } from './feature-modules.provider';

let routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

/* Lazy Loading Modules */
routes = routes.concat(featureModules);
console.log(routes);

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
