import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-recent-journeys',
  templateUrl: './recent-journeys.component.html',
  styleUrls: ['./recent-journeys.component.scss']
})
export class RecentJourneysComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`RecentJourneysComponent has been Initiated..`);
  }

}
