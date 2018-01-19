import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAccountManagementComponent } from './business-account-management.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { ListComponent } from './businesses/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessAccountManagementComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
        { path: 'list', component: ListComponent },
      // { path: 'add', component: AddBusinessComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAccountManagementRoutingModule { }

export const BusinessAccountManagementRoutingComponents =
  [BusinessAccountManagementComponent];
