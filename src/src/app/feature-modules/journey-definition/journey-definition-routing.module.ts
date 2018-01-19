import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyDefinitionComponent } from './journey-definition.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: JourneyDefinitionComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
       { path: '', pathMatch: 'full', redirectTo: 'recentjourneys1' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyDefinitionRoutingModule { }

export const JourneyDefinitionRoutingComponents = [JourneyDefinitionComponent];
