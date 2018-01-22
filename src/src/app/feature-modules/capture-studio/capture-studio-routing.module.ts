import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureStudioComponent } from './capture-studio.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CaptureStudioComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'List1' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureStudioRoutingModule { }

export const CaptureStudioRoutingComponents = [CaptureStudioComponent];
