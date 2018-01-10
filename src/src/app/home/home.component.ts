import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../core/services/log4ts/logger.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log('HomeComponent Init', 1, 2, 3);
    this.logger.log(`environmentName is: ${environment.environmentName}`);
    this.logger.info(`environmentName is: ${environment.environmentName}`);
    this.logger.warn(`environmentName is: ${environment.environmentName}`);
    this.logger.error(`environmentName is: ${environment.environmentName}`);

    console.trace('s');

  }

}
