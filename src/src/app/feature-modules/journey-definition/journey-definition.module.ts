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


// tslint:disable-next-line:max-line-length
import { SelfieEntryTypeComponent } from './add-journey-definition/partials/entry-definition-partial/selfie-entry-type/selfie-entry-type.component';
import { EntryDefinitionPartialComponent } from './add-journey-definition/partials/entry-definition-partial/entry-definition-partial.component';
import { SummaryPartialComponent } from './add-journey-definition/partials/summary-partial/summary-partial.component';

// tslint:disable-next-line:max-line-length
import { EntryDefinitionContainerComponent } from './add-journey-definition/partials/entry-definition-partial/entry-definition-container/entry-definition-container.component';
import { POIEntryTypeComponent } from './add-journey-definition/partials/entry-definition-partial/poi-entry-type/poi-entry-type.component';
import { JourneyDefinitionService } from './journey-definition.service';
import { POAEntryTypeComponent } from './add-journey-definition/partials/entry-definition-partial/poa-entry-type/poa-entry-type.component';
import { ADEntryTypeComponent } from './add-journey-definition/partials/entry-definition-partial/ad-entry-type/ad-entry-type.component';
import { EntryPolicyComponent } from './add-journey-definition/partials/entry-definition-partial/entry-policy/entry-policy.component';

import { ThirdPartyModule } from './third-party-modules/third-party.module';
import { ShowJourneyDefinitionsComponent } from './show-journey-definitions/show-journey-definitions.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    ReactiveFormsModule,
    ThirdPartyModule,

    JourneyDefinitionRoutingModule
  ],
  declarations: [
    JourneyDefinitionComponent,
    AddJourneyDefinitionComponent,
    BasicInfoPartialComponent,
    EntryDefinitionPartialComponent,
    SelfieEntryTypeComponent,
    SummaryPartialComponent,
    EntryDefinitionContainerComponent,
    POIEntryTypeComponent,
    POAEntryTypeComponent,
    ADEntryTypeComponent,
    EntryPolicyComponent,
    ShowJourneyDefinitionsComponent
  ],
  providers: [JourneyDefinitionService]
})
export class JourneyDefinitionModule { }
