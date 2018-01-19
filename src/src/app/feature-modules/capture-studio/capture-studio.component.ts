import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../core/services/logger/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './capture-studio.component.html',
  styleUrls: ['./capture-studio.component.scss']
})
export class CaptureStudioComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`CaptureStudioComponent has been Initiated..`);
  }

}
