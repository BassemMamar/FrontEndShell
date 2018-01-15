import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationComponent } from './investigation-studio.component';
import { AuthGuard } from '../core/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: InvestigationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
       { path: '', pathMatch: 'full', redirectTo: 'recentjourneys' },
      // { path: 'recentjourneys', component: RecentJourneysComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationStudioRoutingModule { }

export const InvestigationRoutingComponents = [InvestigationComponent];
