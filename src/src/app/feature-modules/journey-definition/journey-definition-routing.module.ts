import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyDefinitionComponent } from './journey-definition.component';
import { AuthGuard } from '../../core/auth/auth-guard.service';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';

export function RecentJourneys1Match() {
  return CaseInsensitiveMatcher('RecentJourneys1').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: JourneyDefinitionComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
       { path: '', pathMatch: 'full', redirectTo: 'RecentJourneys1' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyDefinitionRoutingModule { }
