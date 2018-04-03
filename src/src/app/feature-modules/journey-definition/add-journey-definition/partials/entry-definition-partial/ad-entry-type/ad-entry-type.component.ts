import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';
import { CaptureMediaChannels } from '../../../../model/capture-media-channels';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';

@Component({
  selector: 'app-ad-entry-type',
  templateUrl: './ad-entry-type.component.html',
  styleUrls: ['./ad-entry-type.component.scss']
})
export class ADEntryTypeComponent implements OnInit, AfterViewInit {

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

  // return current entry form group which is inside 'entriesArray' FormArray
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;


  // return current entry form group which is inside 'entriesArray' FormArray
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }

  constructor(private loggerService: LoggerService, private fieldValidatorService: FieldValidatorService) { }

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

