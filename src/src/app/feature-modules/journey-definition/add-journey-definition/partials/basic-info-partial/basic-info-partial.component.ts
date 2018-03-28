import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommunicationService } from '../../../../../core/services/communication/communication.service';
import { FieldValidatorService } from '../../../../../shared/components/field-state-display/field-validator.service';

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
    private communicationService: CommunicationService,
    private fieldValidatorService: FieldValidatorService) {
  }

  ngOnInit() {
    this.businessCode = this.communicationService.businessCode;
  }

  ngAfterViewInit(): void {
    //  this.initTouchSpin();
  }

  isFieldValid(field: string) {
    const isFieldValid = this.fieldValidatorService.isFieldValid(this.basicInfoGroup, field);
    // this.validationStatus.emit(isFieldValid);
    return isFieldValid;
    // return this.basicInfoGroup.get(field).invalid &&
    //   (this.basicInfoGroup.get(field).dirty || this.basicInfoGroup.get(field).touched);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.basicInfoGroup, field);

    // return {
    //   'has-danger': this.isFieldValid(field),
    //   'has-feedback': this.isFieldValid(field)
    // };
  }

}
