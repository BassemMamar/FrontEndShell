import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { JourneyDefinitionDetails } from '../../../../model/journey-definition-details';
import { SupportedCaptureMediaChannelInfo } from '../../../../model/supported-capture-media-channel-info';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';

@Component({
  selector: 'app-selfie-entry-type',
  templateUrl: './selfie-entry-type.component.html',
  styleUrls: ['./selfie-entry-type.component.scss']
})
export class SelfieEntryTypeComponent implements OnInit, AfterViewInit {

  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;
  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  @Input() supportedCaptureMediaChannels: SupportedCaptureMediaChannelInfo[];
  // return current entry form group
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }

  constructor(private common: CommonService,
    private fieldValidatorService: FieldValidatorService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }



  initFormGroup() {

  }

  isFieldValid(field: string) {
    return this.fieldValidatorService.isFieldValid(this.currentEntryGroup, field);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.currentEntryGroup, field);
  }

}
