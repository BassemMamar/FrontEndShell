import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../core/services/logger/logger.service';
import { environment } from '../../environments/environment';
import { CommunicationConfigService } from '../core/services/communication-config/communication-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LoggerService, private  communicationConfig: CommunicationConfigService) { }

  ngOnInit() {
    this.logger.log('HomeComponent Init');
    // this.logger.log(`environmentName is: ${environment.environmentName}`);
    // this.logger.info(`environmentName is: ${environment.environmentName}`);
    // this.logger.warn(`environmentName is: ${environment.environmentName}`);
    // this.logger.error(`environmentName is: ${environment.environmentName}`);
    // this.logger.debug(`environmentName is: ${environment.environmentName}`);
    // this.logger.table( [1, 2, 3]);
    this.logger.table(this.communicationConfig);


  }

}
