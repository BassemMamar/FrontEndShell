import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-basic-info-partial',
  templateUrl: './basic-info-partial.component.html',
  styleUrls: ['./basic-info-partial.component.scss']
})
export class BasicInfoPartialComponent implements OnInit, AfterViewInit {

  reasons = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //  this.initTouchSpin();
  }

  initTouchSpin(checked) {
    if (checked) {
      $('#age_limite_min').TouchSpin({
        min: 0,
        max: 99,
        step: 1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10
      });

      $('#age_limite_max').TouchSpin({
        min: 1,
        max: 100,
        step: 1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10
      });
    }
  }

}
