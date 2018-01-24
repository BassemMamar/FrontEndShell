/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Shared Public Modules Imports */
import { UnwrapTagModule } from './directives/unwrap-tag/unwrap-tag.module';

/* Shared Imports */
import { AlertComponent } from './components/alert/alert.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

import { HrefPreventDefaultDirective } from './directives/href-prevent-default/href-prevent-default.directive';


// https://angular.io/guide/styleguide#shared-feature-module
/*
 * offers shared features that we'll expect to use in lots of places with multiple instances
 * This is ideal for widgets or pipes.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        UnwrapTagModule
    ],
    exports: [
        CommonModule,
        FormsModule,

        UnwrapTagModule,

        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective
    ],
    declarations: [
        AlertComponent,
        DateFormatPipe,
        HrefPreventDefaultDirective
    ],
    providers: [],
})
export class SharedModule { }
