import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

import { LoggerService } from '../../../../../../core/base/logger/logger.service';
import { WorldRegionInfo } from '../../../../model/world-region-info';
import { DocumentCategoryInfo } from '../../../../model/document-category-info';
import { CaptureMediaChannels } from '../../../../model/capture-media-channels';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';
import { EntryType } from '../../../../model/entry-type';
import { JourneyEntryDefinitionInfo } from '../../../../model/journey-entry-definition-details';

@Component({
  selector: 'app-poi-entry-type',
  templateUrl: './poi-entry-type.component.html',
  styleUrls: ['./poi-entry-type.component.scss']
})
export class POIEntryTypeComponent implements OnInit, AfterViewInit, OnChanges {

  // needed to current entry type to the <app-entry-policy> instance
  entryType = EntryType;

  /**
   * in Reactive Forms when we want to bind properties inside an FormArray, we should wrap them with parent FormGroup
   * that's why we need to pass the parent of current FormArray
   * parentGroup ==> entryDefinitionGroup coming from root
   * arrayName ==> 'entriesArray'
   * groupName ==> i or index for current FormGroup inside 'entriesArray' FormArray
   */
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName: number;

  @Input() captureMediaChannels: CaptureMediaChannels[];
  @Input() worldRegionInfo: WorldRegionInfo[];
  @Input() documentCategories: DocumentCategoryInfo[];

  @Input() currentEntryData: JourneyEntryDefinitionInfo;

  // the current entry index to be as as order
  @Input() index;

  // this is needed to initialize bootstrap selectpicker
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  // return current entry form group which is inside 'entriesArray' FormArray
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }

  getFieldByName(fieldName: string): FormControl {
    return this.currentEntryGroup.get(fieldName) as FormControl;
  }

  // this need to be passed to the <app-entry-policy> instance
  documentProofPoliciesArrayName = 'documentProofPolicies';

  constructor(private loggerService: LoggerService, private fieldValidatorService: FieldValidatorService) {
    this.currentEntryData = new JourneyEntryDefinitionInfo();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentEntryData == null) {
      this.currentEntryData = new JourneyEntryDefinitionInfo();
    }
  }

  ngAfterViewInit() {
    this.initSelector();
  }

  onChange(value: boolean) {
    if (!value) {
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].setValue('');
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].disable();
    } else {
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].enable();
    }
  }

  // validation stuff
  isFieldValid(field: string) {
    return this.fieldValidatorService.isFieldValid(this.currentEntryGroup, field);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.currentEntryGroup, field);
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }

}
