import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './capture-studio.component.html',
  styleUrls: ['./capture-studio.component.scss']
})
export class CaptureStudioComponent implements OnInit {

  constructor(private logger: LoggerService, private alertService: AlertService) { }

  ngOnInit() {
    this.logger.info(`CaptureStudioComponent has been Initiated..`);
  }

}
