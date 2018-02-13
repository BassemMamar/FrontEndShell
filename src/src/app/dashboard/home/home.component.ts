import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '../../core/base/logger/logger.service';
import { environment } from '../../../environments/environment';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { CommonService } from '../../core/base/utils/common.service';
import { DashboardService } from '../dashboard.service';
import { AlertService } from '../../shared/components/alert/alert.service';

import * as toastr from 'toastr';
import { ToasrtService } from '../../shared/components/toastr/toasrt.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private logger: LoggerService,
    private dashboardService: DashboardService,
    private communicationService: CommunicationService,
    private commonService: CommonService,
    private alertService: AlertService,
    private toasrtService: ToasrtService) { }


  ngOnInit() {
    this.logger.info(`HomeComponent has been Initiated..`);
  }

  TestInterseptor() {
    this.dashboardService.getHeros()
      .subscribe(
      data => console.log(data),
      err => {
        this.toasrtService.toastr.error(err);
        this.alertService.error(err, undefined, { forRoot: true });
      }
      );
  }

  TestToastr() {

    // Display an info toast with no title
    this.toasrtService.toastr.info('Are you the 6 fingered man?');

    // Display a warning toast, with no title
    this.toasrtService.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');

    // Display a success toast, with a title
    this.toasrtService.toastr.success('Have fun storming the castle!', 'Miracle Max Says');

    // Display an error toast, with a title
    this.toasrtService.toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');

    // // Immediately remove current toasts without using animation
    // this.toasrtService.toastr.remove();

    // // Remove current toasts using animation
    // this.toasrtService.toastr.clear();

    // Override global options
    this.toasrtService.toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', { timeOut: 5000 });
  }

  success(message: string, forRoot = false) {
    const title = forRoot ? 'ohhhh for ROOT' : undefined;
    this.alertService.success(message, title, { forRoot: forRoot });
  }

  error(message: string) {
    this.alertService.error(message, undefined, { forRoot: true, showDuring: 0 });
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }

}
