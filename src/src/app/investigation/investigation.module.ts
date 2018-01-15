/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Investigation Imports */
import { InvestigationRoutingModule, investigationRoutingComponents } from './investigation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';

import { InvestigationComponent } from './investigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    InvestigationRoutingModule
  ],
  declarations: [investigationRoutingComponents]
})
export class InvestigationModule { }
