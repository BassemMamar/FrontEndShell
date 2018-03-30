import { NgModule } from '@angular/core';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TreeviewModule, TreeviewEventParser } from 'ngx-treeview';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { TagInputModule } from 'ngx-chips';
import { CustomTreeviewEventParser } from './ngx-treeview/custom-treeview-event-parser';

@NgModule({
    imports: [

        MultiselectDropdownModule, // ToDo remoe this
        TreeviewModule.forRoot(),

        DragulaModule,
        TagInputModule,
    ],
    exports: [
        TreeviewModule,
        MultiselectDropdownModule, // ToDo remoe this
        TagInputModule,
        DragulaModule,

    ],
    declarations: [],
    providers: [
        { provide: TreeviewEventParser, useClass: CustomTreeviewEventParser },
    ],
})
export class ThirdPartyModule { }
