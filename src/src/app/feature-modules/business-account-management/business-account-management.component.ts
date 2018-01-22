import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/services/logger/logger.service';
import { NavMenuItem } from '../../layout/model/nav-menu-item';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './business-account-management.component.html',
  styleUrls: ['./business-account-management.component.scss']

})
export class BusinessAccountManagementComponent implements OnInit {
  navMenuItems: NavMenuItem[];
  constructor(private logger: LoggerService) {
    this.navMenuItems = [];
  }

  ngOnInit() {
    this.logger.info(`BusinessAccountManagementComponent has been Initiated..`);
    this.setupModuleNaigations();
  }

  private setupModuleNaigations() {
    const defaultItem: NavMenuItem = new NavMenuItem();
    defaultItem.icon = '';
    defaultItem.link = '';
    defaultItem.title = 'Default';
    this.navMenuItems.push(defaultItem);

    const show = new NavMenuItem();
    show.link = 'list';
    show.icon = 'flaticon-list';
    show.title = 'Show Businesses';

    const add = new NavMenuItem();
    add.link = 'Add';
    add.icon = 'flaticon-add';
    add.title = 'Add New Business';

    const edit = new NavMenuItem();
    edit.link = 'Edit/45';
    edit.icon = 'flaticon-edit';
    edit.title = 'Edit Business';

    const Businesses: NavMenuItem = new NavMenuItem();
    Businesses.icon = '';
    Businesses.link = '';
    Businesses.title = 'Businesses';

    Businesses.subNav = [show, add, edit];

    this.navMenuItems.push(Businesses);
  }

}
