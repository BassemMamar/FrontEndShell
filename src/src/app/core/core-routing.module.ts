/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Core Routing Components Imports */
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { pathMatcher } from './services/url-case-insensitive/CaseInsensitiveMatcher';

const routes: Routes = [
  {
    matcher: pathMatcher('Unauthorized'),
    // path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    matcher: pathMatcher('Error'),
   // path: 'error',
    component: InternalServerErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }

export const CoreRoutedComponents = [PageNotFoundComponent, UnauthorizedComponent, InternalServerErrorComponent];
