import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAccountManagementComponent } from './business-account-management.component';
import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';

import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';
import { AccessLevelResolver } from '../../core/auth/services/access-level.resolver';

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
   // canActivate: [AuthenticatedGuard],
   // canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
    data: {
      authClient: AuthClients.BAM,
      moduleName: FrontendShell.BusinessAccountManagement.Name
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'List' },
      {
        matcher: ListBusinessMatch, component: ListComponent,
        data: {
          // moduleName: FrontendShell.BusinessAccountManagement.Name,
         // pageName: FrontendShell.BusinessAccountManagement.Pages.ListBusiness
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      },
      {
        matcher: EditBusinessMatch, component: EditComponent,
        data: {
          // moduleName: FrontendShell.BusinessAccountManagement.Name,
          pageName: FrontendShell.BusinessAccountManagement.Pages.EditBusiness
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      }
      // {path: 'Edit/:Id', component: EditComponent }
      // { path: 'add', component: AddBusinessComponent }
    ]
  },
  // {
  //   path: 'InitializeBusiness',
  //   component: InitializeBusinessComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAccountManagementRoutingModule { }


//#region another route definition way

// const routes: Routes = [
//   {
//     path: '',
//     component: BusinessAccountManagementComponent,
//     children: [
//       {
//         path: '',
//         canActivate: [AuthenticatedGuard, AuthorizedGuard],
//         canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
//         data: {
//           authClient: AuthClients.BAM,
//           authorizedRoles: [
//             UserRoles.BusinessAccountManager
//           ]
//         },
//         children: [
//           { path: '', pathMatch: 'full', redirectTo: 'List' },
//           { matcher: ListBusinessMatch, component: ListComponent },
//           { matcher: EditBusinessMatch, component: EditComponent }
//           // {path: 'Edit/:Id', component: EditComponent }
//           // { path: 'add', component: AddBusinessComponent }
//         ]
//       },
//       // {
//       //   path: 'InitializeBusiness',
//       //   component: InitializeBusinessComponent
//       // }
//     ]
//   }

// ];

//#endregion
