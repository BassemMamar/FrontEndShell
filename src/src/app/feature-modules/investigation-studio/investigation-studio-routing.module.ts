import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationComponent } from './investigation-studio.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';
import { pathMatcher } from '../../core/services/url-case-insensitive/CaseInsensitiveMatcher';

const routes: Routes = [
  {
    path: '',
    component: InvestigationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'RecentJourneys' },
      {
        matcher: pathMatcher('RecentJourneys'),
        //  path: 'recentjourneys',
        component: RecentJourneysComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationStudioRoutingModule { }

export const InvestigationRoutingComponents = [InvestigationComponent, RecentJourneysComponent];
