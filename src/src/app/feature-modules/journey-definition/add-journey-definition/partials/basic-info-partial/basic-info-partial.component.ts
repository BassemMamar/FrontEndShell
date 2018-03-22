import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommunicationService } from '../../../../../core/services/communication/communication.service';

@Component({
  selector: 'app-basic-info-partial',
  templateUrl: './basic-info-partial.component.html',
  styleUrls: ['./basic-info-partial.component.scss']
})
export class BasicInfoPartialComponent implements OnInit, AfterViewInit {
  @Input() basicInfoGroup: FormGroup;
  // reasons = [];
  businessCode: string;

  constructor(
    private fb: FormBuilder,
    private communicationService: CommunicationService
  ) {
  }

  ngOnInit() {
    this.businessCode = this.communicationService.businessCode;
  }

  ngAfterViewInit(): void {
    //  this.initTouchSpin();
  }





  // initTouchSpin(checked) {
  //   if (checked) {
  //     $('#age_limite_min').TouchSpin({
  //       min: 0,
  //       max: 149,
  //       step: 1,
  //       decimals: 0,
  //       boostat: 5,
  //       maxboostedstep: 10
  //     });

  //     $('#age_limite_max').TouchSpin({
  //       min: 1,
  //       max: 150,
  //       step: 1,
  //       decimals: 0,
  //       boostat: 5,
  //       maxboostedstep: 10
  //     });

  //     $('#age_limite_min').on('touchspin.on.startspin', () => {
  //       this.test();
  //     });
  //     $('#age_limite_min').on('touchspin.on.stopspin', () => {
  //       this.test();
  //     });
  //     $('#age_limite_min').on('touchspin.on.change', () => {
  //       this.test();
  //     });
  //     $('#age_limite_min').on('touchspin.on.min', () => {
  //       this.test();
  //     });
  //     $('#age_limite_min').on('touchspin.on.max', () => {
  //       this.test();
  //     });
  //   }
  // }

  // test() {
  //   const newval = $('#age_limite_min').val();
  //   console.log('addAlertDollar change fired, dollar value is ', newval);
  //   (<FormGroup>this.basicInfoGroup.controls['ageLimitGroup']).controls['alMinValue'].patchValue(newval);
  // }

}
