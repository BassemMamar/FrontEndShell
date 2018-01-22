import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../../../core/services/logger/logger.service';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private logger: LoggerService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => this.logger.log(params.get('businessId')));
  }

  ngOnInit() {
  }

}
