/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Core Routing Components Imports */
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'error', component: InternalServerErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }

export const CoreRoutedComponents = [PageNotFoundComponent, UnauthorizedComponent, InternalServerErrorComponent];
