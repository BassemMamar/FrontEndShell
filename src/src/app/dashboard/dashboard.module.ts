/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Shared Module Imports */
import { SharedModule } from '../shared/shared.module';

/* Layout Module Imports */
import { LayoutModule } from '../layout/layout.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [DashboardComponent, HomeComponent]
})
export class DashboardModule { }
