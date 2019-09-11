import { Component, OnInit, AfterViewInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`HomeComponent has been Initiated..`);

  }

  ngAfterViewInit() {
  }



}
