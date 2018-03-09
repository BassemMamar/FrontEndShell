import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoggerService } from '../../../core/base/logger/logger.service';

@Component({
  selector: 'app-add-journey-definition',
  templateUrl: './add-journey-definition.component.html',
  styleUrls: ['./add-journey-definition.component.scss']
})
export class AddJourneyDefinitionComponent implements OnInit, AfterViewInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const wizard = $('#m_wizard').mWizard();
    // == Validation before going to next page

    wizard.on('beforeNext', (wzrd: any) => {
     // this.logger.log('beforeNext', wzrd);
      // if (validator.form() !== true) {
      //   return false;  // don't go to the next step
      // }
    });

    // == Change event
    wizard.on('change', (wzrd: any) => {
    //  this.logger.log('change', wzrd);
      // mApp.scrollTop();
      // if (wzrd.currentStep === 1) {
      //   wzrd.goFirst();
      // }
    });
  }

}
