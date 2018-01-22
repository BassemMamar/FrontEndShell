import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { pathMatcher } from '../core/services/url-case-insensitive/CaseInsensitiveMatcher';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { matcher: pathMatcher('Home'), component: HomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'Home' }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const DashboardRoutingComponents = [DashboardComponent, HomeComponent];
