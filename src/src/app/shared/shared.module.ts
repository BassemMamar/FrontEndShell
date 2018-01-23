/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Shared Public Modules Imports */
import { PageLoaderModule } from './public/page-loader/page-loader.module';
import { UnwrapTagModule } from './public/unwrap-tag/unwrap-tag.module';

/* Shared Imports */
import { AlertComponent } from './public/alert/alert.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';


// https://angular.io/guide/styleguide#shared-feature-module
/*
 * offers shared features that we'll expect to use in lots of places with multiple instances
 * This is ideal for widgets or pipes.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        PageLoaderModule,
        UnwrapTagModule
    ],
    exports: [
        CommonModule,
        FormsModule,

        PageLoaderModule,
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
