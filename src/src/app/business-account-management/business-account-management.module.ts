/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* BusinessAccountManagement Imports */
import {
  BusinessAccountManagementRoutingModule,
  BusinessAccountManagementRoutingComponents
} from './business-account-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { BusinessAccountManagementComponent } from './business-account-management.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    BusinessAccountManagementRoutingModule
  ],
  declarations: [BusinessAccountManagementRoutingComponents]
})
export class BusinessAccountManagementModule { }
