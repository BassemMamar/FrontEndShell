import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { NavMenuItem } from '../../layout/model/nav-menu-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',

  templateUrl: './investigation-studio.component.html',
  styleUrls: ['./investigation-studio.component.scss']
})
export class InvestigationComponent implements OnInit {

  navMenuItems: NavMenuItem[];

  constructor(private logger: LoggerService) {
    this.navMenuItems = [];
  }

  ngOnInit() {
    this.logger.info(`InvestigationComponent has been Initiated..`);
    this.setupModuleNaigations();
  }

 private setupModuleNaigations() {
    const defaultItem: NavMenuItem = new NavMenuItem();
    defaultItem.icon = '';
    defaultItem.link = '';
    defaultItem.title = 'Default';
    this.navMenuItems.push(defaultItem);

    const recentJourneys: NavMenuItem = new NavMenuItem();
    recentJourneys.icon = 'flaticon-list';
    recentJourneys.link = 'RecentJourneys';
    recentJourneys.title = 'Recent Journeys';
    this.navMenuItems.push(recentJourneys);
  }
}
