import { Component, OnInit, OnDestroy } from '@angular/core';
// https://github.com/dancancro/great-big-example-application/blob/master/src/main/webapp/app/shared/alert/alert.component.ts
// http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: any[];

  constructor() { }

  ngOnInit() {
   //   this.alerts = this.alertService.get();
  }

  ngOnDestroy() {
      this.alerts = [];
  }

}
