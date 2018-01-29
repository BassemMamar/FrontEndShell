import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ThemeHelperService } from './theme-helper.service';
import { HeaderNavTopComponent } from './header-nav-top/header-nav-top.component';
import { HeaderNavBottomComponent } from './header-nav-bottom/header-nav-bottom.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NavItemContentComponent } from './header-nav-bottom/nav-item-content/nav-item-content.component';



@NgModule({
  imports: [
    SharedModule.forChild(),
    RouterModule
  ],
  declarations: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    NavItemContentComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
  exports: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    FooterComponent,
    BreadcrumbsComponent,
  ],
  providers: [ThemeHelperService]
})
export class LayoutModule { }
