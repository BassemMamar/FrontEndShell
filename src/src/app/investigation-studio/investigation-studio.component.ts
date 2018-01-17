import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../core/services/logger/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',

  templateUrl: './investigation-studio.component.html',
  styleUrls: ['./investigation-studio.component.scss']
})
export class InvestigationComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`InvestigationComponent has been Initiated..`);
  }

}
