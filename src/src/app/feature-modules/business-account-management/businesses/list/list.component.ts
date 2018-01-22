import { Component, OnInit } from '@angular/core';

declare let DatatableDataLocalDemo: any;
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    DatatableDataLocalDemo.init();
  }

}
