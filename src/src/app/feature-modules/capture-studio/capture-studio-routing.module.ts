import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureStudioComponent } from './capture-studio.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';

export function List1Match() {
  return CaseInsensitiveMatcher('List1').apply(this, arguments);
}

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
