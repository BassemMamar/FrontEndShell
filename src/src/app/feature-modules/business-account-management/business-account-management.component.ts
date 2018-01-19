import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './business-account-management.component.html',
  styleUrls: ['./business-account-management.component.scss']

})
export class BusinessAccountManagementComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`BusinessAccountManagementComponent has been Initiated..`);
  }

}
