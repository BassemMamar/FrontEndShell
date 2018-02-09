import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { environment } from '../../../environments/environment';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { CommonService } from '../../core/base/utils/common.service';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private logger: LoggerService,
    private dashboardService: DashboardService,
    private communicationService: CommunicationService,
    private commonService: CommonService) { }


  ngOnInit() {
    this.logger.info(`HomeComponent has been Initiated..`);
    // this.logger.log(`environmentName is: ${environment.environmentName}`);
    // this.logger.info(`environmentName is: ${environment.environmentName}`);
    // this.logger.warn(`environmentName is: ${environment.environmentName}`);
    // this.logger.error(`environmentName is: ${environment.environmentName}`);
    // this.logger.debug(`environmentName is: ${environment.environmentName}`);
    // this.logger.table( [1, 2, 3]);
    //  this.logger.table(this.communicationService);
    const test: number[] = [1, 2, 3];
    //  this.commonService.setItem<number>(test, (temp => true), 5);
  }

  TestInterseptor() {
    this.dashboardService.getHeros()
      .subscribe(
      data => console.log(data),
      err => alert(err)
      );
  }

}
