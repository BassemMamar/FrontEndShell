import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../shared/components/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../../../core/base/logger/logger.service';
import { AccessLevel } from '../../../../core/auth/model/user-roles.enum';

declare let DatatableDataLocalDemo: any;
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  accessLevel: AccessLevel;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private logger: LoggerService) { }

  ngOnInit() {
    DatatableDataLocalDemo.init();
    this.accessLevel = <AccessLevel>this.route.snapshot.data['accessLevel'];
    this.logger.info(`accessLevel ${this.accessLevel}`);
  }

}
