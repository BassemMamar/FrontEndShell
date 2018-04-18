import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { NavMenuItem } from '../../layout/model/nav-menu-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './journey-definition.component.html',
  styleUrls: ['./journey-definition.component.scss']
})
export class JourneyDefinitionComponent implements OnInit {
  navMenuItems: NavMenuItem[];

  constructor(private logger: LoggerService) {
    this.navMenuItems = new Array<NavMenuItem>();

  }

  ngOnInit() {
    this.logger.info(`JourneyDefinitionComponent has been Initiated..`);
    this.setupModuleNaigations();
  }

  private setupModuleNaigations() {
    // const defaultItem: NavMenuItem = new NavMenuItem();
    // defaultItem.icon = '';
    // defaultItem.link = '';
    // defaultItem.title = 'Default';
    // this.navMenuItems.push(defaultItem);

    const show = new NavMenuItem();
    show.link = '/JourneyDefinition';
    show.icon = 'flaticon-list';
    show.title = 'Show Journey Definitions';

    const add = new NavMenuItem();
    add.link = 'New';
    add.icon = 'flaticon-add';
    add.title = 'New Journey Definition';

    const JourneyDefinitions: NavMenuItem = new NavMenuItem();
    JourneyDefinitions.icon = '';
    JourneyDefinitions.link = '';
    JourneyDefinitions.title = 'Journey Definition';

    JourneyDefinitions.subNav = [show, add];

    this.navMenuItems.push(JourneyDefinitions);
  }

}
