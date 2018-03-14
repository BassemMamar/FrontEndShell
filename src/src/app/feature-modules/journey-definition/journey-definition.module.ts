/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* Journey Definition Imports */
import { JourneyDefinitionRoutingModule } from './journey-definition-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { JourneyDefinitionComponent } from './journey-definition.component';
import { AddJourneyDefinitionComponent } from './add-journey-definition/add-journey-definition.component';
import { BasicInfoPartialComponent } from './add-journey-definition/partials/basic-info-partial/basic-info-partial.component';


import { SelfieEntryTypeComponent } from './add-journey-definition/partials/entry-definition-partial/selfie-entry-type/selfie-entry-type.component';


// tslint:disable-next-line:max-line-length
import { EntryDefinitionPartialComponent } from './add-journey-definition/partials/entry-definition-partial/entry-definition-partial.component';
import { SummaryPartialComponent } from './add-journey-definition/partials/summary-partial/summary-partial.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { TagInputModule } from 'ngx-chips';
import { TempViewComponent } from './add-journey-definition/partials/temp-view/temp-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    ReactiveFormsModule,

    DragulaModule,
    TagInputModule,
    JourneyDefinitionRoutingModule
  ],
  declarations: [
    JourneyDefinitionComponent,
    AddJourneyDefinitionComponent,
    BasicInfoPartialComponent,
    EntryDefinitionPartialComponent,
    SelfieEntryTypeComponent,
    SummaryPartialComponent,
    TempViewComponent
  ]
})
export class JourneyDefinitionModule { }
