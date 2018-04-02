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
  businessCode: string;

  constructor(
    private fb: FormBuilder,
    private communicationService: CommunicationService,
    private fieldValidatorService: FieldValidatorService) {
  }

  ngOnInit() {
    this.businessCode = this.communicationService.businessCode;
  }

  ngAfterViewInit() {
  }

  isFieldValid(field: string) {
    const isFieldValid = this.fieldValidatorService.isFieldValid(this.basicInfoGroup, field);
    return isFieldValid;
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.basicInfoGroup, field);
  }

}
