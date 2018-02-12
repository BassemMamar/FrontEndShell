import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '../../core/base/logger/logger.service';
import { environment } from '../../../environments/environment';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { CommonService } from '../../core/base/utils/common.service';
import { DashboardService } from '../dashboard.service';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private logger: LoggerService,
    private dashboardService: DashboardService,
    private communicationService: CommunicationService,
    private commonService: CommonService,
    private alertService: AlertService) { }


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


  success(message: string) {
    this.alertService.success('Well done!', message);
  }

  error(message: string) {
    this.alertService.error('Opps!', message);
  }

  info(message: string) {
    this.alertService.info('Info!', message);
  }

  warn(message: string) {
    this.alertService.warn('Warning!', message);
  }

  clear() {
    this.alertService.clear();
  }

}
