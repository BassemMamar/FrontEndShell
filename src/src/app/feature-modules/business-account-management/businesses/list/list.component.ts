import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../shared/components/alert/alert.service';

declare let DatatableDataLocalDemo: any;
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    DatatableDataLocalDemo.init();
    this.alertService.printCounter();

  }

}
