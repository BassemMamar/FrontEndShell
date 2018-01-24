import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAccountManagementComponent } from './business-account-management.component';
import { AuthGuard } from '../../core/services/auth/auth-guard.service';
import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';

export function ListBusinessMatch() {
  return CaseInsensitiveMatcher('List').apply(this, arguments);
}
export function EditBusinessMatch() {
  return CaseInsensitiveMatcher('Edit/:businessId').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: BusinessAccountManagementComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'List' },
      { matcher: ListBusinessMatch, component: ListComponent },
      { matcher: EditBusinessMatch, component: EditComponent }
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
