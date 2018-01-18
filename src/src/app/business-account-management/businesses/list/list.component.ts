import { Component, OnInit } from '@angular/core';

declare let DatatableDataLocalDemo: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bam-business-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    DatatableDataLocalDemo.init();
  }

}
