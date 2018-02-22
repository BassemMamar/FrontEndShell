import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ThemeHelperService } from './theme-helper.service';
import { HeaderNavTopComponent } from './header-nav-top/header-nav-top.component';
import { HeaderNavBottomComponent } from './header-nav-bottom/header-nav-bottom.component';
import { HeaderNavBottomItemComponent } from './header-nav-bottom/header-nav-bottom-item/header-nav-bottom-item.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { AsideNavItemComponent } from './aside-nav/aside-nav-item/aside-nav-item.component';



@NgModule({
  imports: [
    SharedModule.forChild(),
    RouterModule
  ],
  declarations: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    HeaderNavBottomItemComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AsideNavComponent,
    AsideNavItemComponent
  ],
  exports: [
    HeaderNavTopComponent,
    HeaderNavBottomComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AsideNavComponent
  ],
  providers: [ThemeHelperService]
})
export class LayoutModule { }
