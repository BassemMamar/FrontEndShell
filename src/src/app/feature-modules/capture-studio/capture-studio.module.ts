/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Capture Studio Imports */
import { CaptureStudioRoutingModule } from './capture-studio-routing.module';
import { CaptureStudioComponent } from './capture-studio.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { StartJourneyComponent } from './start-journey/start-journey.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    CaptureStudioRoutingModule
  ],
  declarations: [CaptureStudioComponent, StartJourneyComponent]
})
export class CaptureStudioModule { }
