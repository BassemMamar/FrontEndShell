import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderNavTopComponent } from './header-nav-top/header-nav-top.component';
import { HeaderNavBottomComponent } from './header-nav-bottom/header-nav-bottom.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    FooterComponent,
    BreadcrumbsComponent,
  ],
  exports: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    FooterComponent,
    BreadcrumbsComponent,
  ]
})
export class LayoutModule { }
