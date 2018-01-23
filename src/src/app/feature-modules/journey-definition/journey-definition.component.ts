import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './journey-definition.component.html',
  styleUrls: ['./journey-definition.component.scss']
})
export class JourneyDefinitionComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`JourneyDefinitionComponent has been Initiated..`);
  }

}
