/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Journey Definition Imports */
import { JourneyDefinitionRoutingModule } from './journey-definition-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { JourneyDefinitionComponent } from './journey-definition.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    JourneyDefinitionRoutingModule
  ],
  declarations: [JourneyDefinitionComponent]
})
export class JourneyDefinitionModule { }
