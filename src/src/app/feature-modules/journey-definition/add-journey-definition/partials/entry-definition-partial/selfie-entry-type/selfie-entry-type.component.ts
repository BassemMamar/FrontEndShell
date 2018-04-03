import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { JourneyDefinitionDetails } from '../../../../model/journey-definition-details';
import { CaptureMediaChannels } from '../../../../model/capture-media-channels';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';

@Component({
  selector: 'app-selfie-entry-type',
  templateUrl: './selfie-entry-type.component.html',
  styleUrls: ['./selfie-entry-type.component.scss']
})
export class SelfieEntryTypeComponent implements OnInit, AfterViewInit {

  /**
   * in Reactive Forms when we want to bind properties inside an FormArray, we should wrap them with parent FormGroup
   * that's why we need to pass the parent of current FormArray
   * parentGroup ==> entryDefinitionGroup coming from root
   * arrayName ==> 'entriesArray'
   * groupName ==> i or index for current FormGroup inside 'entriesArray' FormArray
   */
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() captureMediaChannels: CaptureMediaChannels[];

  // the current entry index to be as as order
  @Input() index;

  // this is needed to initialize bootstrap selectpicker
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  // return current entry form group which is inside 'entriesArray' FormArray
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }

  constructor(private fieldValidatorService: FieldValidatorService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }

  // validation stuff
  isFieldValid(field: string) {
    return this.fieldValidatorService.isFieldValid(this.currentEntryGroup, field);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.currentEntryGroup, field);
  }

}
