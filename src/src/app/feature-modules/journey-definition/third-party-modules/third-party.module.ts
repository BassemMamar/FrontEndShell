import { NgModule } from '@angular/core';

import { TreeviewModule, TreeviewEventParser } from 'ngx-treeview';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { TagInputModule } from 'ngx-chips';
import { CustomTreeviewEventParser } from './ngx-treeview/custom-treeview-event-parser';

@NgModule({
    imports: [

        TreeviewModule.forRoot(),

        DragulaModule,
        TagInputModule,
    ],
    exports: [
        TreeviewModule,
        TagInputModule,
        DragulaModule,

    ],
    declarations: [],
    providers: [
        { provide: TreeviewEventParser, useClass: CustomTreeviewEventParser },
    ],
})
export class ThirdPartyModule { }
