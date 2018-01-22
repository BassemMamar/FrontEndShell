import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAccountManagementComponent } from './business-account-management.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';
import { pathMatcher } from '../../core/services/url-case-insensitive/CaseInsensitiveMatcher';

const routes: Routes = [
  {
    path: '',
    component: BusinessAccountManagementComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'List' },
      { matcher: pathMatcher('List'), component: ListComponent },
     { matcher: pathMatcher('Edit/:businessId'), component: EditComponent }
      // {path: 'Edit/:Id', component: EditComponent }
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
