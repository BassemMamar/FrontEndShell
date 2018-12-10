import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyDefinitionComponent } from './journey-definition.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';
import { AccessLevelResolver } from '../../core/auth/services/access-level.resolver';
import { AddJourneyDefinitionComponent } from './add-journey-definition/add-journey-definition.component';
import { ShowJourneyDefinitionsComponent } from './show-journey-definitions/show-journey-definitions.component';

export function AddJourneyDefinitionMatch() {
  return CaseInsensitiveMatcher('New').apply(this, arguments);
}
export function EditJourneyDefinitionMatch() {
  return CaseInsensitiveMatcher(':journeyDefinitionId').apply(this, arguments);
}
export function ShowJourneyDefinitionsMatch() {
  return CaseInsensitiveMatcher('').apply(this, arguments);
}


const routes: Routes = [
  {
    path: '',
    component: JourneyDefinitionComponent,
   // canActivate: [AuthenticatedGuard, AuthorizedGuard],
  //  canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
    data: {
      authClient: AuthClients.FES,
      moduleName: FrontendShell.JourneyDefinition.Name
    },
    children: [
      // { path: '', pathMatch: 'full', redirectTo: 'New' },
      {
        matcher: AddJourneyDefinitionMatch, component: AddJourneyDefinitionComponent,
        data: {
          moduleName: FrontendShell.JourneyDefinition.Name,
          pageName: FrontendShell.JourneyDefinition.Pages.AddJourneyDefinition
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      },
      {
        matcher: EditJourneyDefinitionMatch, component: AddJourneyDefinitionComponent,
        data: {
          moduleName: FrontendShell.JourneyDefinition.Name,
          pageName: FrontendShell.JourneyDefinition.Pages.AddJourneyDefinition
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      },
      {
        path: '', //  matcher: ShowJourneyDefinitionsMatch,
        component: ShowJourneyDefinitionsComponent,
        data: {
          moduleName: FrontendShell.JourneyDefinition.Name,
          pageName: FrontendShell.JourneyDefinition.Pages.ShowJourneyDefinitions
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyDefinitionRoutingModule { }
