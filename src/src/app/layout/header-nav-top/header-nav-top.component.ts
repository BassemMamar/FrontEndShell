import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { ModulesSharedInfoService } from '../../core/services/modules-shared-info/modules-shared-info.service';


declare let mLayout: any;
@Component({
    selector: 'app-header-nav-top',
    templateUrl: './header-nav-top.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavTopComponent implements OnInit, AfterViewInit {
    currentModule: string;

    // constructor(private modulesSharedInfoService: ModulesSharedInfoService) {
    // }
    constructor() { }
    ngOnInit() {
        this.currentModule = ''; // this.modulesSharedInfoService.CurrentModule;


    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }

    setCurrentModule(name: string): void {
        //   this.modulesSharedInfoService.CurrentModule = name;

    }

}
