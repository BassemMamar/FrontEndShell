/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Shared Imports */
import { AlertComponent } from './components/alert/alert.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { UnwrapTagDirective } from './directives/unwrap-tag.directive';

// https://angular.io/guide/styleguide#shared-feature-module
/*
 * offers shared features that we'll expect to use in lots of places with multiple instances
 * This is ideal for widgets or pipes.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,

        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective,
        UnwrapTagDirective
    ],
    declarations: [
        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective,
        UnwrapTagDirective
    ],
    providers: [],
})
export class SharedModule { }
