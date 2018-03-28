/* Angular Imports */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Shared Imports */
import { AlertComponent } from './components/alert/alert.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

import { HrefPreventDefaultDirective } from './directives/href-prevent-default/href-prevent-default.directive';
import { AlertService } from './components/alert/alert.service';
import { ToastrService } from './components/toastr/toastr.service';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUITemplateComponent } from './components/block-ui/block-ui-template.component';
import { ModalComponent } from './components/modal/modal.component';
import { UnwrapTagDirective } from './directives/unwrap-tag/unwrap-tag.directive';
import { UnwrapTagService } from './directives/unwrap-tag/unwrap-tag.service';
import { ScrollToDirective } from './directives/scroll-to/scroll-to.directive';
import { FieldStateDisplayComponent } from './components/field-state-display/field-state-display.component';
import { FieldValidatorService } from './components/field-state-display/field-validator.service';

// https://angular.io/guide/styleguide#shared-feature-module
/*
 * offers shared features that we'll expect to use in lots of places with multiple instances
 * This is ideal for widgets or pipes.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        // https://github.com/kuuurt13/ng-block-ui
        BlockUIModule
    ],
    exports: [
        CommonModule,
        FormsModule,

        BlockUIModule,

        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        BlockUITemplateComponent,
        ModalComponent,
        ScrollToDirective,
        FieldStateDisplayComponent

    ],
    declarations: [
        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        BlockUITemplateComponent,
        ModalComponent,
        ScrollToDirective,
        FieldStateDisplayComponent
    ],
    entryComponents: [
        BlockUITemplateComponent
    ],
    providers: [],
})
export class SharedModule {

    /**
     * Creates a module with all the Components, directives, Pipes and providers.
     * https://angular.io/guide/singleton-services#forroot
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AlertService,
                ToastrService,
                UnwrapTagService,
                FieldValidatorService
                // services go here
            ]
        };
    }

    /**
     * Creates a module with all the Components, directives, Pipes BUT without Providers.
     */
    static forChild(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }


}
