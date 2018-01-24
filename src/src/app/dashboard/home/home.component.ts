import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { environment } from '../../../environments/environment';
import { CommunicationConfigService } from '../../core/services/communication-config/communication-config.service';
import { CommonService } from '../../core/base/utils/common.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LoggerService, private communicationConfig: CommunicationConfigService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.logger.info(`HomeComponent has been Initiated..`);

    // this.logger.log(`environmentName is: ${environment.environmentName}`);
    // this.logger.info(`environmentName is: ${environment.environmentName}`);
    // this.logger.warn(`environmentName is: ${environment.environmentName}`);
    // this.logger.error(`environmentName is: ${environment.environmentName}`);
    // this.logger.debug(`environmentName is: ${environment.environmentName}`);
    // this.logger.table( [1, 2, 3]);
    this.logger.table(this.communicationConfig);
    const test: number[] = [1, 2, 3];
    this.commonService.setItem<number>(test, (temp => true), 5);
  }

}
